import React, {
  useState,
  Fragment,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import ArrowIconActive from 'src/web/ats/assets/icons/right_arrow_active.svg';
import ArrowIconInactive from 'src/web/ats/assets/icons/right_arrow_inactive.svg';
import RightPointer from 'src/web/ats/assets/icons/right_pointer.svg';
import DownArrowImage from 'src/web/ats/assets/images/live_cv/down_arrow.svg';
import MettlLogo from 'src/web/ats/assets/images/mettl_logo.png';
import RadialProgressBar from '../common/radialProgressBar';
import * as S from './styles';

const BASE_COLOR = '#EEA304';
const MAX_NO_OF_SCREENING_QUESTIONS = mobileAndTabletCheck() ? 1 : 2;
const MAX_NO_OF_VIDEO_RESPONSES = 1;
const MAX_NO_OF_TECHNICAL_ASSESSMENTS = 1;
const MAX_RATING = 10;
const DEEPSCREEN_TYPE = {
  selfScreening: 'SELF_SCREENING',
  videoSelfScreening: 'VIDEO_SELF_SCREENING',
  technicalAssessments: 'TECHNICAL_ASSESSMENTS',
};

const getAssessmentPartnerLogo = (type) => ({
  Mettl: MettlLogo,
}[type]);

const getDifficultyLevel = (level) => ({
  EASY: 33,
  MEDIUM: 66,
  DIFFICULT: 99,
}[level]);

const UserSkills = ({ skills }) => {
  const [deepScreenResponseType, setDeepScreenResponseType] = useState(
    DEEPSCREEN_TYPE.videoSelfScreening,
  );
  const [activeSkill, setActiveSkill] = useState(0);
  const [deepScreenResponseIndex, setDeepScreenResponseIndex] = useState(
    MAX_NO_OF_SCREENING_QUESTIONS,
  );
  const [videoResponsesIndex, setVideoResponsesIndex] = useState(
    MAX_NO_OF_VIDEO_RESPONSES,
  );
  const [technicalAssessmentIndex, setTechnicalAssessmentIndex] = useState(
    MAX_NO_OF_TECHNICAL_ASSESSMENTS,
  );
  const [isPrevActive, setIsPrevActive] = useState(false);
  const [isNextActive, setIsNextActive] = useState(true);
  const [isPrevActiveTech, setIsPrevActiveTech] = useState(false);
  const [isNextActiveTech, setIsNextActiveTech] = useState(true);
  const [isPrevActiveVideo, setIsPrevActiveVideo] = useState(false);
  const [isNextActiveVideo, setIsNextActiveVideo] = useState(true);

  const videoPlayback = useRef();

  const resetActionsAndIndexToInitialState = () => {
    setIsPrevActive(false);
    setIsNextActive(true);
    setIsPrevActiveTech(false);
    setIsNextActiveTech(true);
    setIsPrevActiveVideo(false);
    setIsNextActiveVideo(true);
    setDeepScreenResponseIndex(MAX_NO_OF_SCREENING_QUESTIONS);
    setTechnicalAssessmentIndex(MAX_NO_OF_TECHNICAL_ASSESSMENTS);
    setVideoResponsesIndex(MAX_NO_OF_VIDEO_RESPONSES);

    if (videoPlayback?.current) {
      videoPlayback.current.pause();
      videoPlayback.current.currentTime = 0;
    }
  };

  const handleActiveSkill = (skillIndex) => () => {
    setActiveSkill(skillIndex);
    resetActionsAndIndexToInitialState();
  };

  const handleScreeningQuestions = (type) => () => {
    const totalNumberOfDeepScreenResponse = skills[activeSkill].deep_screen_response.length;

    if (type === 'next') {
      if (totalNumberOfDeepScreenResponse > deepScreenResponseIndex) {
        setDeepScreenResponseIndex(
          (prevState) => prevState + MAX_NO_OF_SCREENING_QUESTIONS,
        );
        setIsPrevActive(true);
        setIsNextActive(true);
      } else {
        setIsNextActive(false);
        setIsPrevActive(true);
      }
    } else if (deepScreenResponseIndex !== MAX_NO_OF_SCREENING_QUESTIONS) {
      setDeepScreenResponseIndex(
        (prevState) => prevState - MAX_NO_OF_SCREENING_QUESTIONS,
      );
      setIsPrevActive(true);
      setIsNextActive(true);
    } else {
      setIsNextActive(true);
      setIsPrevActive(false);
    }
  };

  const handleTechnicalAssessments = (type) => () => {
    const totalNumberOfTechnicalAssessment = skills[activeSkill].technical_assessments.length;

    if (type === 'next') {
      if (totalNumberOfTechnicalAssessment > technicalAssessmentIndex) {
        setTechnicalAssessmentIndex(
          (prevState) => prevState + MAX_NO_OF_TECHNICAL_ASSESSMENTS,
        );
        setIsPrevActiveTech(true);
        setIsNextActiveTech(true);
      } else {
        setIsNextActiveTech(false);
        setIsPrevActiveTech(true);
      }
    } else if (technicalAssessmentIndex !== MAX_NO_OF_TECHNICAL_ASSESSMENTS) {
      setTechnicalAssessmentIndex(
        (prevState) => prevState - MAX_NO_OF_TECHNICAL_ASSESSMENTS,
      );
      setIsPrevActiveTech(true);
      setIsNextActiveTech(true);
    } else {
      setIsNextActiveTech(true);
      setIsPrevActiveTech(false);
    }
  };

  const handleVideoResponses = (type) => () => {
    const totalNumberOfVideoResponses = skills[activeSkill].video_responses.length;

    if (type === 'next') {
      if (totalNumberOfVideoResponses > videoResponsesIndex) {
        setVideoResponsesIndex(
          (prevState) => prevState + MAX_NO_OF_VIDEO_RESPONSES,
        );
        setIsPrevActiveVideo(true);
        setIsNextActiveVideo(true);
      } else {
        setIsNextActiveVideo(false);
        setIsPrevActiveVideo(true);
      }
    } else if (videoResponsesIndex !== MAX_NO_OF_VIDEO_RESPONSES) {
      setVideoResponsesIndex(
        (prevState) => prevState - MAX_NO_OF_VIDEO_RESPONSES,
      );
      setIsPrevActiveVideo(true);
      setIsNextActiveVideo(true);
    } else {
      setIsNextActiveVideo(true);
      setIsPrevActiveVideo(false);
    }
  };

  const isSelfScreening = skills[activeSkill].deep_screen_response?.length;
  const isTechnical = skills[activeSkill].technical_assessments?.length;
  const isVideoSelfScreening = skills[activeSkill].video_responses?.length;

  const selfScreening = isSelfScreening
    ? skills[activeSkill].deep_screen_response
    : null;
  const technical = isTechnical
    ? skills[activeSkill].technical_assessments
    : null;
  const videoSelfScreening = isVideoSelfScreening
    ? skills[activeSkill].video_responses
    : null;

  return (
    <S.Container>
      <S.Head>Skill Profile</S.Head>
      <S.Desc>
        This section lists out this candidate&apos;s skills. The rating for each
        skill is a composite score combining inferred skills from Mercurial,
        technical assessments and the candidate&apos;s responses to self-screening
        questions.
      </S.Desc>
      <S.SkillsListContainer>
        <S.SkillsList>
          {skills
            .sort(
              (firstSkill, secondSkill) => secondSkill.rating - firstSkill.rating,
            )
            .map((item, skillIndex) => (
              <S.SkillItemContainer
                key={skillIndex}
                active={activeSkill === skillIndex}
              >
                <S.SkillItem
                  onClick={handleActiveSkill(skillIndex)}
                  active={activeSkill === skillIndex}
                >
                  <S.SkillName title={item.skill}>{item.skill}</S.SkillName>
                  <S.SkillRatings>
                    {new Array(MAX_RATING).fill().map((__, ratingIndex) => (
                      <S.SkillRating
                        key={ratingIndex}
                        isFilled={ratingIndex + 1 <= item.rating}
                      />
                    ))}
                  </S.SkillRatings>
                  {mobileAndTabletCheck() ? (
                    <S.DownArrow
                      src={DownArrowImage}
                      alt=""
                      active={activeSkill === skillIndex}
                    />
                  ) : null}
                </S.SkillItem>
                {!mobileAndTabletCheck() && activeSkill === skillIndex ? (
                  <S.SkillActivePointer src={RightPointer} />
                ) : null}
                {mobileAndTabletCheck() && activeSkill === skillIndex ? (
                  <S.ScreeningQuestionContainer>
                    <S.DeepScreenTabs>
                      <S.ScreeningQuestionType
                        onClick={() => setDeepScreenResponseType(
                          DEEPSCREEN_TYPE.videoSelfScreening,
                        )
                        }
                        isActive={
                          deepScreenResponseType
                          === DEEPSCREEN_TYPE.videoSelfScreening
                        }
                      >
                        Video Self-Screening
                      </S.ScreeningQuestionType>
                      <S.ScreeningQuestionType
                        onClick={() => setDeepScreenResponseType(
                          DEEPSCREEN_TYPE.selfScreening,
                        )
                        }
                        isActive={
                          deepScreenResponseType
                          === DEEPSCREEN_TYPE.selfScreening
                        }
                      >
                        Self-Screening
                      </S.ScreeningQuestionType>
                      <S.ScreeningQuestionType
                        onClick={() => setDeepScreenResponseType(
                          DEEPSCREEN_TYPE.technicalAssessments,
                        )
                        }
                        isActive={
                          deepScreenResponseType
                          === DEEPSCREEN_TYPE.technicalAssessments
                        }
                      >
                        Technical Assessments
                      </S.ScreeningQuestionType>
                    </S.DeepScreenTabs>
                    {deepScreenResponseType
                    === DEEPSCREEN_TYPE.videoSelfScreening ? (
                      <Fragment>
                        {isVideoSelfScreening ? (
                          <Fragment>
                            {skills[activeSkill].video_responses.map(
                              (vItem, vIndex) => (vIndex + 1 === videoResponsesIndex ? (
                                  <S.ScreeningQuestions key={vIndex}>
                                    <S.VideoScreeningQuestion>
                                      <S.VideoResponse
                                        controls
                                        autoPlay={false}
                                        ref={videoPlayback}
                                        key={vItem.video_response_url}
                                      >
                                        <source
                                          src={vItem.video_response_url}
                                          type="video/webm"
                                        />
                                        <source
                                          src={vItem.video_response_url}
                                          type="video/mp4"
                                        />
                                        Sorry, your browser doesn&apos;t support
                                        embedded videos.
                                      </S.VideoResponse>
                                      <div>
                                        <div>{vItem.screening_question} </div>
                                        <span>{vItem.created_at}</span>
                                      </div>
                                    </S.VideoScreeningQuestion>
                                  </S.ScreeningQuestions>
                              ) : null),
                            )}
                            {videoSelfScreening.length
                            > MAX_NO_OF_VIDEO_RESPONSES ? (
                              <S.ScreeningQuestionActions>
                                <S.PrevArrow
                                  onClick={handleVideoResponses('prev')}
                                  active={isPrevActiveVideo}
                                >
                                  <S.PrevArrowIcon
                                    src={
                                      isPrevActiveVideo
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isPrevActiveVideo}
                                  />
                                </S.PrevArrow>
                                <S.NextArrow
                                  onClick={handleVideoResponses('next')}
                                  active={isNextActiveVideo}
                                >
                                  <S.NextArrowIcon
                                    src={
                                      isNextActiveVideo
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isNextActiveVideo}
                                  />
                                </S.NextArrow>
                              </S.ScreeningQuestionActions>
                              ) : null}
                          </Fragment>
                        ) : (
                          <S.NoScreeningQuestions>
                            There are no video responses w.r.t to this specific
                            skill.
                          </S.NoScreeningQuestions>
                        )}
                      </Fragment>
                      ) : null}
                    {deepScreenResponseType
                    === DEEPSCREEN_TYPE.selfScreening ? (
                      <Fragment>
                        {isSelfScreening ? (
                          <Fragment>
                            {skills[activeSkill].deep_screen_response.map(
                              (sqItem, sqIndex) => (sqIndex + 1 === deepScreenResponseIndex ? (
                                  <S.ScreeningQuestions key={sqIndex}>
                                    <S.ScreeningQuestion>
                                      <span>Q.{sqIndex + 1}</span>
                                      <div>
                                        {sqItem.screening_question}{' '}
                                        <span>
                                          {sqItem.created_at.slice(0, 10)}
                                        </span>
                                      </div>
                                    </S.ScreeningQuestion>
                                    <S.ScreeningAnswer>
                                      {sqItem.user_responses.join(', ')}
                                    </S.ScreeningAnswer>
                                  </S.ScreeningQuestions>
                              ) : null),
                            )}
                            {selfScreening.length
                            > MAX_NO_OF_SCREENING_QUESTIONS ? (
                              <S.ScreeningQuestionActions>
                                <S.PrevArrow
                                  onClick={handleScreeningQuestions('prev')}
                                  active={isPrevActive}
                                >
                                  <S.PrevArrowIcon
                                    src={
                                      isPrevActive
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isPrevActive}
                                  />
                                </S.PrevArrow>
                                <S.NextArrow
                                  onClick={handleScreeningQuestions('next')}
                                  active={isNextActive}
                                >
                                  <S.NextArrowIcon
                                    src={
                                      isNextActive
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isNextActive}
                                  />
                                </S.NextArrow>
                              </S.ScreeningQuestionActions>
                              ) : null}
                          </Fragment>
                        ) : (
                          <S.NoScreeningQuestions>
                            There are no self screening responses w.r.t to this
                            specific skill.
                          </S.NoScreeningQuestions>
                        )}
                      </Fragment>
                      ) : null}
                    {deepScreenResponseType
                    === DEEPSCREEN_TYPE.technicalAssessments ? (
                      <Fragment>
                        {isTechnical ? (
                          <Fragment>
                            {technical.map((tItem, tIndex) => (
                              tIndex + 1 === technicalAssessmentIndex ? (
                                <Fragment key={tIndex}>
                                  <S.AssessmentDate>
                                    {new Date(tItem.assessment_date)
                                      .toUTCString()
                                      .split(' ')
                                      .slice(0, 4)
                                      .join(' ')}
                                  </S.AssessmentDate>
                                  <S.TechnicalAssessments>
                                    <S.AssessmentPartner>
                                      <img
                                        src={getAssessmentPartnerLogo(
                                          tItem.assessment_partner,
                                        )}
                                        alt={tItem.assessment_partner}
                                      />
                                      <div>Assessment Partner</div>
                                    </S.AssessmentPartner>
                                    <S.AssessmentName>
                                      <div>{tItem.assessment_name}</div>
                                      <div>Assessment Name</div>
                                    </S.AssessmentName>
                                    <S.AssessmentDifficulty>
                                      <RadialProgressBar
                                        progress={getDifficultyLevel(
                                          tItem.level,
                                        )}
                                        text={tItem.level}
                                        color={BASE_COLOR}
                                        strokeWidth={6}
                                        inactiveColor={BASE_COLOR}
                                        radius={36}
                                      />
                                      <div>Difficulty</div>
                                    </S.AssessmentDifficulty>
                                    <S.AssessmentScore>
                                      <RadialProgressBar
                                        progress={Number(tItem.score)}
                                        color={BASE_COLOR}
                                        strokeWidth={6}
                                        inactiveColor={BASE_COLOR}
                                        radius={36}
                                      />
                                      <div>Assessment Score</div>
                                    </S.AssessmentScore>
                                  </S.TechnicalAssessments>
                                </Fragment>
                              ) : null))}
                            {technical.length
                            > MAX_NO_OF_TECHNICAL_ASSESSMENTS ? (
                              <S.TechnicalAssessmentsActions>
                                <S.PrevArrow
                                  onClick={handleTechnicalAssessments('prev')}
                                  active={isPrevActiveTech}
                                >
                                  <S.PrevArrowIcon
                                    src={
                                      isPrevActiveTech
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isPrevActiveTech}
                                  />
                                </S.PrevArrow>
                                <S.NextArrow
                                  onClick={handleTechnicalAssessments('next')}
                                  active={isNextActiveTech}
                                >
                                  <S.NextArrowIcon
                                    src={
                                      isNextActiveTech
                                        ? ArrowIconActive
                                        : ArrowIconInactive
                                    }
                                    active={isNextActiveTech}
                                  />
                                </S.NextArrow>
                              </S.TechnicalAssessmentsActions>
                              ) : null}
                          </Fragment>
                        ) : (
                          <S.NoTechnicalAssessment>
                            There is no technical assessment taken for this
                            specific skill.
                          </S.NoTechnicalAssessment>
                        )}
                      </Fragment>
                      ) : null}
                  </S.ScreeningQuestionContainer>
                ) : null}
              </S.SkillItemContainer>
            ))}
        </S.SkillsList>

        {!mobileAndTabletCheck() ? (
          <S.ScreeningQuestionContainer>
            <S.ScreeningQuestionHead>
              DeepScreen Responses
            </S.ScreeningQuestionHead>
            <S.DeepScreenTabs>
              <S.ScreeningQuestionType
                onClick={() => setDeepScreenResponseType(DEEPSCREEN_TYPE.videoSelfScreening)
                }
                isActive={
                  deepScreenResponseType === DEEPSCREEN_TYPE.videoSelfScreening
                }
              >
                Video Self-Screening
              </S.ScreeningQuestionType>
              <S.ScreeningQuestionType
                onClick={() => setDeepScreenResponseType(DEEPSCREEN_TYPE.selfScreening)
                }
                isActive={
                  deepScreenResponseType === DEEPSCREEN_TYPE.selfScreening
                }
              >
                Self-Screening
              </S.ScreeningQuestionType>
              <S.ScreeningQuestionType
                onClick={() => setDeepScreenResponseType(
                  DEEPSCREEN_TYPE.technicalAssessments,
                )
                }
                isActive={
                  deepScreenResponseType
                  === DEEPSCREEN_TYPE.technicalAssessments
                }
              >
                Technical Assessments
              </S.ScreeningQuestionType>
            </S.DeepScreenTabs>
            {deepScreenResponseType === DEEPSCREEN_TYPE.videoSelfScreening ? (
              <Fragment>
                {isVideoSelfScreening ? (
                  <Fragment>
                    {skills[activeSkill].video_responses.map((vItem, vIndex) => (
                      vIndex + 1 === videoResponsesIndex ? (
                        <S.ScreeningQuestions key={vIndex}>
                          <S.VideoScreeningQuestion>
                            <S.VideoResponse
                              controls
                              autoPlay={false}
                              ref={videoPlayback}
                              key={vItem.video_response_url}
                            >
                              <source
                                src={vItem.video_response_url}
                                type="video/webm"
                              />
                              <source
                                src={vItem.video_response_url}
                                type="video/mp4"
                              />
                              Sorry, your browser doesn&apos;t support embedded
                              videos.
                            </S.VideoResponse>
                            <div>
                              {vItem.screening_question}{' '}
                              <span>{vItem.created_at}</span>
                            </div>
                          </S.VideoScreeningQuestion>
                        </S.ScreeningQuestions>
                      ) : null))}
                    {videoSelfScreening.length > MAX_NO_OF_VIDEO_RESPONSES ? (
                      <S.ScreeningQuestionActions>
                        <S.PrevArrow
                          onClick={handleVideoResponses('prev')}
                          active={isPrevActiveVideo}
                        >
                          <S.PrevArrowIcon
                            src={
                              isPrevActiveVideo
                                ? ArrowIconActive
                                : ArrowIconInactive
                            }
                            active={isPrevActiveVideo}
                          />
                        </S.PrevArrow>
                        <S.NextArrow
                          onClick={handleVideoResponses('next')}
                          active={isNextActiveVideo}
                        >
                          <S.NextArrowIcon
                            src={
                              isNextActiveVideo
                                ? ArrowIconActive
                                : ArrowIconInactive
                            }
                            active={isNextActiveVideo}
                          />
                        </S.NextArrow>
                      </S.ScreeningQuestionActions>
                    ) : null}
                  </Fragment>
                ) : (
                  <S.NoScreeningQuestions>
                    There are no video responses w.r.t to this specific skill.
                  </S.NoScreeningQuestions>
                )}
              </Fragment>
            ) : null}
            {deepScreenResponseType === DEEPSCREEN_TYPE.selfScreening ? (
              <Fragment>
                {isSelfScreening ? (
                  <Fragment>
                    {selfScreening
                      .slice(
                        deepScreenResponseIndex - MAX_NO_OF_SCREENING_QUESTIONS,
                        deepScreenResponseIndex,
                      )
                      .map((sqItem, sqIndex) => (
                        <S.ScreeningQuestions key={sqIndex}>
                          <S.ScreeningQuestion>
                            <span>
                              Q.
                              {sqIndex
                                + deepScreenResponseIndex
                                - MAX_NO_OF_SCREENING_QUESTIONS
                                + 1}
                            </span>
                            <div>
                              {sqItem.screening_question}{' '}
                              <span>{sqItem.created_at.slice(0, 10)}</span>
                            </div>
                          </S.ScreeningQuestion>
                          <S.ScreeningAnswer>
                            {sqItem.user_responses.join(', ')}
                          </S.ScreeningAnswer>
                        </S.ScreeningQuestions>
                      ))}
                    {selfScreening.length > MAX_NO_OF_SCREENING_QUESTIONS ? (
                      <S.ScreeningQuestionActions>
                        <S.PrevArrow
                          onClick={handleScreeningQuestions('prev')}
                          active={isPrevActive}
                        >
                          <S.PrevArrowIcon
                            src={
                              isPrevActive ? ArrowIconActive : ArrowIconInactive
                            }
                            active={isPrevActive}
                          />
                        </S.PrevArrow>
                        <S.NextArrow
                          onClick={handleScreeningQuestions('next')}
                          active={isNextActive}
                        >
                          <S.NextArrowIcon
                            src={
                              isNextActive ? ArrowIconActive : ArrowIconInactive
                            }
                            active={isNextActive}
                          />
                        </S.NextArrow>
                      </S.ScreeningQuestionActions>
                    ) : null}
                  </Fragment>
                ) : (
                  <S.NoScreeningQuestions>
                    There are no self screening responses w.r.t to this specific
                    skill.
                  </S.NoScreeningQuestions>
                )}
              </Fragment>
            ) : null}
            {deepScreenResponseType === DEEPSCREEN_TYPE.technicalAssessments ? (
              <Fragment>
                {isTechnical ? (
                  <Fragment>
                    {technical.map((tItem, tIndex) => (tIndex + 1 === technicalAssessmentIndex ? (
                        <Fragment key={tIndex}>
                          <S.AssessmentDate>
                            {new Date(tItem.assessment_date)
                              .toUTCString()
                              .split(' ')
                              .slice(0, 4)
                              .join(' ')}
                          </S.AssessmentDate>
                          <S.TechnicalAssessments>
                            <S.AssessmentPartner>
                              <img
                                src={getAssessmentPartnerLogo(
                                  tItem.assessment_partner,
                                )}
                                alt={tItem.assessment_partner}
                              />
                              <div>Assessment Partner</div>
                            </S.AssessmentPartner>
                            <S.AssessmentName>
                              <div>{tItem.assessment_name}</div>
                              <div>Assessment Name</div>
                            </S.AssessmentName>
                            <S.AssessmentDifficulty>
                              <RadialProgressBar
                                progress={getDifficultyLevel(tItem.level)}
                                text={tItem.level}
                                color={BASE_COLOR}
                                strokeWidth={6}
                                inactiveColor={BASE_COLOR}
                                radius={36}
                              />
                              <div>Difficulty</div>
                            </S.AssessmentDifficulty>
                            <S.AssessmentScore>
                              <RadialProgressBar
                                progress={Number(tItem.score)}
                                color={BASE_COLOR}
                                strokeWidth={6}
                                inactiveColor={BASE_COLOR}
                                radius={36}
                              />
                              <div>Assessment Score</div>
                            </S.AssessmentScore>
                          </S.TechnicalAssessments>
                        </Fragment>
                    ) : null))}
                    {technical.length > MAX_NO_OF_TECHNICAL_ASSESSMENTS ? (
                      <S.TechnicalAssessmentsActions>
                        <S.PrevArrow
                          onClick={handleTechnicalAssessments('prev')}
                          active={isPrevActiveTech}
                        >
                          <S.PrevArrowIcon
                            src={
                              isPrevActiveTech
                                ? ArrowIconActive
                                : ArrowIconInactive
                            }
                            active={isPrevActiveTech}
                          />
                        </S.PrevArrow>
                        <S.NextArrow
                          onClick={handleTechnicalAssessments('next')}
                          active={isNextActiveTech}
                        >
                          <S.NextArrowIcon
                            src={
                              isNextActiveTech
                                ? ArrowIconActive
                                : ArrowIconInactive
                            }
                            active={isNextActiveTech}
                          />
                        </S.NextArrow>
                      </S.TechnicalAssessmentsActions>
                    ) : null}
                  </Fragment>
                ) : (
                  <S.NoTechnicalAssessment>
                    There is no technical assessment taken for this specific
                    skill.
                  </S.NoTechnicalAssessment>
                )}
              </Fragment>
            ) : null}
          </S.ScreeningQuestionContainer>
        ) : null}
      </S.SkillsListContainer>
    </S.Container>
  );
};

UserSkills.propTypes = {
  skills: PropTypes.array,
};

export default UserSkills;
