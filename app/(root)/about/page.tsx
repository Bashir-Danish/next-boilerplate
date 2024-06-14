'use client'
import React from 'react'
import {useTranslations} from 'next-intl';

const About = () => {
 
  const t = useTranslations('Index');


  
  return (
    <div className='flex flex-col'>
      <h1>{t('title')}</h1>
    </div>
  );
}

export default About
