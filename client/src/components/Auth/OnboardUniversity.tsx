import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSelector } from '~/components/ui';
import { universities } from '~/db_data/universityData';

function MyOnboardUniversity() {
  const navigate = useNavigate();
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [classInfo, setClassInfo] = useState('');

  const selectedUniversity = universities.find((uni) => uni.name === university);
  const selectedDepartment = selectedUniversity?.departments.find(
    (dept) => dept.name === department,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (university && department && classInfo) {
      navigate('/onboard/class');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 dark:bg-gray-900 sm:pt-0">
      <div className="absolute bottom-0 left-0 m-4">
        <ThemeSelector />
      </div>
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Please complete your enrollment
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <select
              value={university}
              onChange={(e) => {
                setUniversity(e.target.value);
                setDepartment('');
                setClassInfo('');
              }}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            >
              <option value="">Select Your University</option>
              {universities.map((uni, index) => (
                <option key={index} value={uni.name}>
                  {uni.name}
                </option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setClassInfo('');
              }}
              disabled={!university}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:disabled:bg-gray-600"
            >
              <option value="">Select Your Department</option>
              {selectedUniversity?.departments.map((dept, index) => (
                <option key={index} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              value={classInfo}
              onChange={(e) => setClassInfo(e.target.value)}
              disabled={!department}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:disabled:bg-gray-600"
            >
              <option value="">Select Your Class</option>
              {selectedDepartment?.classes.map((cls, index) => (
                <option
                  key={index}
                  value={`${cls.code} - ${cls.name}`}
                >{`${cls.code} - ${cls.name}`}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!university || !department || !classInfo}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyOnboardUniversity;
