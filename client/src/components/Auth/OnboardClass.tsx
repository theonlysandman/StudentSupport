import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSelector } from '~/components/ui';

function OnboardClass() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('paste');
  const [emails, setEmails] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process emails or CSV file here
    navigate('/c/new');
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 dark:bg-gray-900 sm:pt-0">
      <div className="absolute bottom-0 left-0 m-4">
        <ThemeSelector />
      </div>
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Invite Students to Your Class
        </h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('paste')}
            className={`rounded-t-md px-4 py-2 ${
              activeTab === 'paste'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Paste Emails
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`rounded-t-md px-4 py-2 ${
              activeTab === 'csv'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Upload CSV
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {activeTab === 'paste' ? (
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Paste email addresses here, separated by commas, spaces, or new lines"
              className="h-40 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          ) : (
            <div className="flex h-40 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600">
              <label htmlFor="csv-upload" className="cursor-pointer">
                <span className="text-indigo-600 dark:text-indigo-400">Upload a CSV file</span>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {csvFile && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{csvFile}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            Invite Students
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardClass;
