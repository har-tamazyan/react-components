import React, {
  useCallback, useEffect, useState, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { API_BASE_URL, API_URL_VERSION_2 } from 'src/config/env';
import { getCookie } from 'src/config/utils';

import SearchIcon from '../../../assets/icons/search_black_icon.svg';
import API_END_POINTS from '../../../config/integrations';
import WaitingIndicator from '../../atoms/waitingIndicator';
import { postWithResponseObject } from '../../../../../config/utils';
import * as S from './styles';

const INITIAL_SEARCH_DETAILS = {
  offset: 1,
  total: 0,
};

const DEBOUNCE_TIME = 500;
const NEXT_OFFSET_NUMBER = 100;

const JobsFilterModal = (props) => {
  const [selectedJobs, setSelectedJobs] = useState(
    props.selectedJobs.reduce(
      (acc, job) => ({
        ...acc,
        [job.id]: job,
      }), {},
    ),
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [searchTypingTimer, setSearchTypingTimer] = useState(null);
  const [searchDetails, setSearchDetails] = useReducer((state, payload) => (
    {
      ...state,
      ...payload,
    }
  ), INITIAL_SEARCH_DETAILS);
  const [isMoreJobsFetched, setMoreJobsFetched] = useState(false);
  const fetchJobs = async (offset = 0) => {
    const searchQueryTrimmed = searchQuery.trim();
    if (!offset) setLoadingJobs(true);
    const headers = {
      'Content-type': 'application/json',
      authorization: getCookie('authToken'),
    };
    const searchRequestData = {
      status: ['open', 'sourcing_draft'],
      limit: 100,
      offset,
      ...(searchQueryTrimmed && { query: searchQueryTrimmed }),
    };
    const jobsRes = await postWithResponseObject(
      API_BASE_URL(API_URL_VERSION_2) + API_END_POINTS.searchJobs,
      searchRequestData,
      headers,
    );
    setJobs(offset ? [...jobs, ...jobsRes.data.data] : jobsRes.data.data);
    setSearchDetails({ total: jobsRes.data.total });
    setLoadingJobs(false);
    setMoreJobsFetched(false);
    return true;
  };

  const handleScroll = useCallback((e) => {
    const LIMIT_OFFSET = searchDetails.offset + NEXT_OFFSET_NUMBER;
    if (LIMIT_OFFSET >= searchDetails.total || jobs.length >= searchDetails.total) return;
    const jobsContainer = e.target;
    if (
      jobsContainer.scrollTop > jobsContainer.scrollHeight - (jobsContainer.scrollHeight / 5)
      && !isMoreJobsFetched
    ) {
      setSearchDetails({ offset: LIMIT_OFFSET });
      setMoreJobsFetched(true);
      fetchJobs(LIMIT_OFFSET);
    }
  }, [searchDetails, jobs, isMoreJobsFetched]);

  const handleDebouncedFetch = () => {
    setSearchTypingTimer(clearTimeout(searchTypingTimer));
    setSearchTypingTimer(setTimeout(() => {
      fetchJobs();
    }, DEBOUNCE_TIME));
  };

  const selectJob = (job) => () => {
    setSelectedJobs({
      ...selectedJobs,
      [job.id]: job,
    });
  };

  const deSelectJob = (job) => () => {
    setSelectedJobs(Object.values(selectedJobs)
      .reduce((acc, _job) => ({
        ...acc,
        ...(job.id !== _job.id) && { [_job.id]: _job },
      }), {}));
  };

  useEffect(() => {
    setSearchDetails({ total: 0, offset: 1 });
    handleDebouncedFetch();
    return () => setSearchTypingTimer(clearTimeout(searchTypingTimer));
  }, [searchQuery]);

  const jobsList = jobs.length ? jobs.map((job, index) => <S.Job
    isSelected={Boolean(selectedJobs[job.id])} key={`selected_job_${index}_${job.id}`}
    onClick={selectJob(job)}>

    <S.UPI
      title={job.job_code ? `${job.job_code}` : ''}>{job.job_code ? `${job.job_code}` : ''}</S.UPI>

    <S.JobTitle
      title={`${job.title || job.key} (${typeof job.total_candidates_count === 'number' ? job.total_candidates_count : job.doc_count})`}
    > {`${job.title || job.key} (${typeof job.total_candidates_count === 'number' ? job.total_candidates_count : job.doc_count})`}
    </S.JobTitle>
    <S.CompanyName title={job.company?.name || ''}>{job.company?.name || ''}</S.CompanyName>

  </S.Job>) : <p>No results found</p>;
  return <S.Card>

    <S.ModalTitle>Select Job</S.ModalTitle>
    <S.JobSelector>
      <S.SearchBar>
        <img src={SearchIcon} alt="search"/>
        <input
          type="text"
          placeholder={'Search Job'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </S.SearchBar>
      <S.Jobs onScroll={handleScroll}>

        {loadingJobs ? <>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <WaitingIndicator msg={'Loading'}/>
        </> : jobsList}
        {
          isMoreJobsFetched ? <WaitingIndicator msg={'Loading'}/> : null
        }
      </S.Jobs>
    </S.JobSelector>

    <S.Label>Selected Job(s)</S.Label>
    <S.SelectedJobs>
      {isEmpty(selectedJobs)
        ? <S.NoJobsSelectedNote>
            No jobs selected
          </S.NoJobsSelectedNote>
        : Object.values(selectedJobs)
          .map((job, index) => <S.SelectedJob key={`job_${index}_${job.id}`}>
            <p>
              {`${job.job_code ? `${job.job_code}  ` : ''}${job.title || job.key}(${typeof job.total_candidates_count === 'number' ? job.total_candidates_count : job.doc_count})`}
            </p>
            <span title='remove' onClick={deSelectJob(job)}>&times;</span>
          </S.SelectedJob>)
      }
    </S.SelectedJobs>

    <S.Actions isSelectedJobs={!isEmpty(selectedJobs)}>
      <S.CTA onClick={() => {
        props.onApply(
          Object.values(selectedJobs)
            .map((_) => ({ id: _.id, selected: true, key: _.title || _.key })),
        );
        props.closeModal();
      }}
      >Apply now</S.CTA>
    </S.Actions>

  </S.Card>;
};

JobsFilterModal.propTypes = {
  selectedJobs: PropTypes.array,
  onApply: PropTypes.func,
  closeModal: PropTypes.func,
};

export default JobsFilterModal;
