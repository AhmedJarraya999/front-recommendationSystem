import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import axios from 'axios';

const Contact = () => {
  const formRef = useRef();

  const [showResult, setShowResult] = useState(false);
  const [form, setForm] = useState({
    // name: "",
    // email: "",
    // message: "",
    skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [resultJobTitle, setResultJobTitle] = useState('');
  const [resultMissingSkills, setResultMissingSkills] = useState([]);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const postData = async () => {
    setLoading(true);
    let result;
    try {
      result = await axios.post('http://127.0.0.1:8000/users/studyplan/', {
        skills: form.skills,
      });
    } catch (error) {
      alert('Catch Api error');
      return;
    }

    if (result?.status != 200) {
      alert('Api error');
      return;
    }
    const job_title = result?.data?.job_title;
    const missing_skills = result?.data?.missing_skills;
    setResultJobTitle(job_title);
    setResultMissingSkills(missing_skills);
    setShowResult(true);
    console.log('result', result);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <>
      {showResult === false && (
        <div
          className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
        >
          <motion.div
            variants={slideIn('left', 'tween', 0.2, 1)}
            className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
          >
            <p className={styles.sectionSubText}>Need some</p>
            <h3 className={styles.sectionHeadText}>Guidance.</h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  {' '}
                  Enter Your skills separeted by comma(,)
                </span>
                <input
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Tell me about your skills"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>

              <button
                type="submit"
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </motion.div>
          <motion.div
            variants={slideIn('right', 'tween', 0.2, 1)}
            className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      )}

      {showResult === true && (
        <>
          <p className={styles.sectionSubText}>You seem to be a </p>
          <h2 className={styles.sectionHeadText}>{resultJobTitle}</h2>
          <p className={styles.sectionSubText}>
            But you need to work more on those skills{' '}
          </p>
          <br />
          <ul className="flex gap-4">
            {Array.isArray(resultMissingSkills) &&
              resultMissingSkills.map((skillItem, index) => (
                <li className="bg-purple-500 text-base p-2 text-lg" key={index}>
                  {skillItem}
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
