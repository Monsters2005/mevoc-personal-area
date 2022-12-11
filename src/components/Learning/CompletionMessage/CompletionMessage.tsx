import React from 'react';
import { merge } from 'lodash';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router';
import { countPercentage } from '../../../utils/common/countPercentage';
import { useSwiperRef } from '../../../utils/lib/useSwiperRef';
import { Button } from '../../UI/Button/Button';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';
import { LearningSvgSelector } from '../LearningSvgSelector';
import { btnStyles } from '../Stages/FirstStage/FirstStage';
import s from './CompletionMessage.module.scss';
import '../../../styles/lib/swiper.scss';
import { resultMessages } from '../../../constants/resultMessages';
import { Path } from '../../../constants/routes';
import common from '../../UI/Common.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import learning from '../Learning.i18n.json';
import dashboard from '../../Dashboard/Dashboard.i18n.json';

type ListProgress = {
  words: number;
  wordsLearned: number;
  name: string;
  id: number;
};

type Props = {
  progresses: ListProgress[] | [];
};

function WordsInfo({
  words,
  wordsLearned,
}: {
  words: number;
  wordsLearned: number;
}) {
  const { t } = useLocalTranslation(merge(common, dashboard, learning));

  return (
    <div className={s.completion_words}>
      {`${wordsLearned} ${t('outOf')} ${`${words} ${t(
        `word${words !== 1 ? 's' : ''}`
      )}`}`}
    </div>
  );
}

const buttonStyles = {
  width: '50px',
  height: '50px',
  margin: 'auto 0',
};

export default function CompletionMessage({ progresses }: Props) {
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();

  const { t } = useLocalTranslation(merge(common, dashboard, learning));
  const isProgress = progresses.filter(item => item.wordsLearned !== 0).length !== 0;
  const message = resultMessages.find(item => item.isProgress === isProgress);

  const navigate = useNavigate();

  return (
    <div className={s.completion_container}>
      <h3 className={s.completion_title}>{t(message?.title ?? '')}</h3>
      <h6 className={s.completion_description}>{t(message?.message ?? '')}</h6>

      <div className={s.completion_progresses}>
        <Button
          styles={buttonStyles}
          type="small"
          ref={prevElRef}
          onClick={() => null}
        >
          <LearningSvgSelector id="arrow-left" />
        </Button>
        <Swiper
          modules={[Navigation]}
          navigation={progresses.length > 1 && { prevEl, nextEl }}
          slidesPerView={1}
        >
          {progresses.map((item: ListProgress) => {
            const progress = countPercentage(item.wordsLearned, item.words);
            return (
              <SwiperSlide key={item.id}>
                <div className={s.completion_progress}>
                  <CircularProgress
                    width={200}
                    height={200}
                    progressValue={progress}
                    bgColor="#353742"
                    circleStroke={10}
                    asset={(
                      <WordsInfo
                        words={item.words}
                        wordsLearned={item.wordsLearned}
                      />
                    )}
                  />
                </div>
                <p className={s.completion_listname}>{item.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Button
          styles={buttonStyles}
          type="small"
          ref={nextElRef}
          onClick={() => null}
        >
          <LearningSvgSelector id="arrow-right" />
        </Button>
      </div>
      <Button
        styles={{ ...btnStyles, padding: '6px 14px', marginTop: '30px' }}
        type="primary"
        onClick={() => navigate(`/${Path.HOME}`)}
      >
        {t('finish')}
      </Button>
    </div>
  );
}
