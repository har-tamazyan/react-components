/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import * as S from './styles';

const Experience = ({ experience }) => {
  // [NOTE]: DO NOT UNCOMMENT THE FOLLOWING

  // const [isVerified, setIsVerified] = useState(false);
  // useEffect(() => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < experience.length; i++) {
  //     if (experience[i].is_verified) {
  //       setIsVerified(true);
  //       break;
  //     }
  //   }
  // }, []);

  // if (isVerified === false) return null;

  experience.sort((a, b) => {
    if (a.duration_end === null) return -1;
    if (b.duration_end === null) return 1;
    return new Date(b.duration_end) - new Date(a.duration_end);
  });

  return (
    <S.Container>
      <S.Head>Experience</S.Head>
      {!mobileAndTabletCheck() ? (
        <S.ExperienceList>
          {experience
            .map((item, expIndex) => {
              /* Setting is_verified flag as true, as a workaround to comply with backend changes.
              * [ATS-1124] - https://talent500.atlassian.net/jira/software/projects/ATS/boards/5?selectedIssue=ATS-1124&text=live
              */
              item.is_verified = true;
              return (item.is_verified ? (
              <S.ExpItem key={expIndex}>
                {mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastExperience={experience.length - 1 === expIndex}
                    isSecondLastExperience={experience.length - 2 === expIndex}
                  />
                ) : null}

                <S.CompanyAndLocation>
                  <S.Company>{item.company}</S.Company>
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
                </S.CompanyAndLocation>

                {!mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastExperience={experience.length - 1 === expIndex}
                  />
                ) : null}

                <S.Details>
                  <S.DetailsTitle>{item.title}</S.DetailsTitle>
                  <S.DetailsTypes>
                    <div>
                      {item.experience_infrastructures?.length
                        ? `${item.experience_infrastructures.join(', ')} ${
                            item.experience_roles?.length ? ' | ' : null
                        }`
                        : null}
                      {item.experience_roles?.length
                        ? `${item.experience_roles.join(', ')} ${
                          item.industry ? ' | ' : null
                        }`
                        : null}
                      {item.industry ? `${item.industry}` : ''}
                    </div>
                    {item.experience_clients.length ? (
                      <div>
                        <span>Clients</span>:{' '}
                        {item.experience_clients.join(', ')}
                      </div>
                    ) : null}
                  </S.DetailsTypes>
                  <S.Description>{item.description}</S.Description>
                  {item.experience_skills?.length ? (
                    <S.Skills>
                      {item.experience_skills.map((skillItem) => (
                        <S.SkillItem key={skillItem}>{skillItem}</S.SkillItem>
                      ))}
                    </S.Skills>
                  ) : null}
                </S.Details>
              </S.ExpItem>
              ) : null);
            })}
        </S.ExperienceList>
      ) : (
        <S.ExperienceList>
          {experience.map((item, expIndex) => {
            /* Setting is_verified flag as true, as a workaround to comply with backend changes.
            * [ATS-1124] - https://talent500.atlassian.net/jira/software/projects/ATS/boards/5?selectedIssue=ATS-1124&text=live
            */
            item.is_verified = true;
            return (item.is_verified ? (
              <S.ExpItem key={expIndex}>
                {mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastExperience={experience.length - 1 === expIndex}
                    isSecondLastExperience={experience.length - 2 === expIndex}
                  />
                ) : null}

                <S.CompanyAndLocation>
                  {item.title ? (
                    <S.DetailsTitle>{item.title}</S.DetailsTitle>
                  ) : null}
                  {item.company ? <S.Company>{item.company}</S.Company> : null}
                  {item.experience_infrastructures?.length
                  || item.experience_roles?.length
                  || item.industry?.length
                  || item.experience_clients?.length ? (
                    <S.DetailsTypes>
                      <div>
                        {item.experience_infrastructures?.length
                          ? `${item.experience_infrastructures.join(', ')} ${
                              item.experience_roles?.length ? ' | ' : null
                          }`
                          : null}
                        {item.experience_roles?.length
                          ? `${item.experience_roles.join(', ')}  ${
                            item.industry ? ' | ' : null
                          }`
                          : null}
                        {item.industry ? `${item.industry}` : ''}
                      </div>
                      {item.experience_clients.length ? (
                        <div>
                          <span>Clients</span>:{' '}
                          {item.experience_clients.join(', ')}
                        </div>
                      ) : null}
                    </S.DetailsTypes>
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
                </S.CompanyAndLocation>

                {!mobileAndTabletCheck() ? (
                  <S.Separator
                    isLastExperience={experience.length - 1 === expIndex}
                  />
                ) : null}

                <S.Details>
                  {item.description ? (
                    <S.Description>{item.description}</S.Description>
                  ) : null}
                  {item.experience_skills?.length ? (
                    <S.Skills>
                      {item.experience_skills.map((skillItem) => (
                        <S.SkillItem key={skillItem}>{skillItem}</S.SkillItem>
                      ))}
                    </S.Skills>
                  ) : null}
                </S.Details>
              </S.ExpItem>
            ) : null);
          })}
        </S.ExperienceList>
      )}
    </S.Container>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
};

export default Experience;
