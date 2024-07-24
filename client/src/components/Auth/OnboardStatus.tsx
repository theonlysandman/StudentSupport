import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSelector } from '~/components/ui';

function OnboardStatus() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { email: 'student1@example.com', status: 'enrolled' },
    { email: 'student2@example.com', status: 'waiting' },
    { email: 'student3@example.com', status: 'enrolled' },
    { email: 'student4@example.com', status: 'waiting' },
    { email: 'student5@example.com', status: 'enrolled' },
    { email: 'student6@example.com', status: 'waiting' },
    { email: 'student7@example.com', status: 'enrolled' },
  ]);
  const [sortColumn, setSortColumn] = useState('email');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }

    const sortedStudents = [...students].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setStudents(sortedStudents);
  };

  const handleResendEmail = (email) => {
    console.log(`Resending email to ${email}`);
  };

  const handleViewWork = (email) => {
    console.log(`Viewing work for ${email}`);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleInviteStudents = () => {
    navigate('/class');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start bg-white pt-6 dark:bg-gray-900 sm:pt-0">
      <div className="absolute right-4 top-4">
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          X
        </button>
      </div>
      <div className="absolute bottom-0 left-0 m-4">
        <ThemeSelector />
      </div>
      <div className="w-full max-w-4xl space-y-8 p-6">
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Class: Introduction to Computer Science
        </h1>
        <p className="text-center text-xl text-gray-700 dark:text-gray-300">
          Students completed setup: 4 out of 7
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['email', 'status', 'actions'].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {column}
                    {sortColumn === column && (
                      <span className="ml-2">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{student.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{student.status}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {student.status === 'enrolled' ? (
                      <button
                        onClick={() => handleViewWork(student.email)}
                        className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                      >
                        View Work
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResendEmail(student.email)}
                        className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                      >
                        Resend Email
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleInviteStudents}
            className="group relative flex w-full max-w-xs justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            View Class Highlights
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardStatus;
