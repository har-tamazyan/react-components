/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import * as S from './styles';

const Education = ({ education }) => {
  // [NOTE]: DO NOT UNCOMMENT THE FOLLOWING

  // const [isVerified, setIsVerified] = useState(false);
  // useEffect(() => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < education.length; i++) {
  //     if (education[i].is_verified) {
  //       setIsVerified(true);
  //       break;
  //     }
  //   }
  // }, []);

  // if (isVerified === false) return null;

  education.sort((a, b) => {
    if (a.duration_end === null) return -1;
    if (b.duration_end === null) return 1;
    return new Date(b.duration_end) - new Date(a.duration_end);
  });

  return (
    <S.Container>
      <S.Head>Education</S.Head>
      {!mobileAndTabletCheck() ? (
        <S.EducationList>
          {education.map((item, eduIndex) => {
            /* Setting is_verified flag as true, as a workaround to comply with backend changes.
            * [ATS-1124] - https://talent500.atlassian.net/jira/software/projects/ATS/boards/5?selectedIssue=ATS-1124&text=live
            */
            item.is_verified = true;
            return (item.is_verified ? (
              <S.EduItem key={eduIndex}>
                {mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastEducation={education.length - 1 === eduIndex}
                    isSecondLastEducation={education.length - 2 === eduIndex}
                  />
                ) : null}

                <S.DegreeAndLocation>
                  <S.Degree>{item.degree}</S.Degree>
                  <S.Location>{item.location}</S.Location>
                  {item.is_verified ? (
                    <S.Duration>
                      {item.duration_start
                        ? `${item.duration_start.slice(0, 4)} - `
                        : null}
                      {item.is_current
                        ? 'Present'
                        : item.duration_end
                          ? item.duration_end.slice(0, 4)
                          : null}
                    </S.Duration>
                  ) : (item.duration_start && item.duration_end)
                    || (item.duration_start && item.is_current) ? (
                    <S.Duration>
                      {item.duration_start
                        ? `${item.duration_start.slice(0, 4)} - `
                        : null}
                      {item.is_current
                        ? 'Present'
                        : item.duration_end
                          ? item.duration_end.slice(0, 4)
                          : null}
                    </S.Duration>
                    ) : null}
                </S.DegreeAndLocation>

                {!mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastEducation={education.length - 1 === eduIndex}
                  />
                ) : null}

                <S.Details>
                  <S.DetailsTitle>{item.specialization}</S.DetailsTitle>
                  <S.DetailsInstitute>{item.institute}</S.DetailsInstitute>
                  <S.Description>{item.summary}</S.Description>
                </S.Details>
              </S.EduItem>
            ) : null);
          })}
        </S.EducationList>
      ) : (
        <S.EducationList>
          {education.map((item, eduIndex) => {
            /* Setting is_verified flag as true, as a workaround to comply with backend changes.
            * [ATS-1124] - https://talent500.atlassian.net/jira/software/projects/ATS/boards/5?selectedIssue=ATS-1124&text=live
            */
            item.is_verified = true;
            return (item.is_verified ? (
              <S.EduItem key={eduIndex}>
                {mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastEducation={education.length - 1 === eduIndex}
                    isSecondLastEducation={education.length - 2 === eduIndex}
                  />
                ) : null}

                {item.specialization ? (
                  <S.DetailsTitle>{item.specialization}</S.DetailsTitle>
                ) : null}
                <S.DegreeAndLocation>
                  {item.degree ? <S.Degree>{item.degree}</S.Degree> : null}
                  {item.institute ? (
                    <S.DetailsInstitute>{item.institute}</S.DetailsInstitute>
                  ) : null}
                  {item.location ? (
                    <S.Location>{item.location}</S.Location>
                  ) : null}
                  {item.is_verified ? (
                    <S.Duration>
                      {item.duration_start
                        ? `${item.duration_start.slice(0, 4)} - `
                        : null}
                      {item.is_current
                        ? 'Present'
                        : item.duration_end
                          ? item.duration_end.slice(0, 4)
                          : null}
                    </S.Duration>
                  ) : (item.duration_start && item.duration_end)
                    || (item.duration_start && item.is_current) ? (
                    <S.Duration>
                      {item.duration_start
                        ? `${item.duration_start.slice(0, 4)} - `
                        : null}
                      {item.is_current
                        ? 'Present'
                        : item.duration_end
                          ? item.duration_end.slice(0, 4)
                          : null}
                    </S.Duration>
                    ) : null}
                </S.DegreeAndLocation>

                {!mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastEducation={education.length - 1 === eduIndex}
                  />
                ) : null}
                {item.summary ? (
                  <S.Description>{item.summary}</S.Description>
                ) : null}
              </S.EduItem>
            ) : null);
          })}
        </S.EducationList>
      )}
    </S.Container>
  );
};

Education.propTypes = {
  education: PropTypes.array,
};

export default Education;
