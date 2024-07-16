import React from 'react';
import { useLocalize } from '~/hooks';
import { useCreateSharedLinkMutation } from '~/data-provider';
import { useEffect } from 'react';
import { Spinner } from '~/components/svg';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '~/utils';

export default function TeacherOptionsDialog({
  conversationId,
  title,
  isUpdated,
}: {
  conversationId: string;
  title: string;
  setDialogOpen: (open: boolean) => void;
  isUpdated: boolean;
}) {
  const localize = useLocalize();
  const { isLoading } = useCreateSharedLinkMutation();

  const Circle = ({ color }) => {
    const colorMap = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
    };

    return <div className={`mx-auto h-6 w-6 rounded-full ${colorMap[color]}`}></div>;
  };

  console.log('TeacherOptionsDialog rendered', { conversationId, title, isUpdated });

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

  return (
    <div className="container mx-auto bg-white p-4 text-black dark:bg-gray-800 dark:text-white">
      <Tabs.Root defaultValue="details">
        <Tabs.List className="mb-4 flex border-b border-gray-200 dark:border-gray-700">
          <Tabs.Trigger
            value="details"
            className={cn(
              'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm',
              'text-black transition-all duration-200 ease-in-out',
              'radix-state-active:bg-gray-100 radix-state-active:text-black',
              'dark:text-white dark:radix-state-active:bg-gray-600 dark:radix-state-active:text-white',
            )}
          >
            {localize('com_ui_teacher_options_overview_tab')}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="detailedView"
            className={cn(
              'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm',
              'text-black transition-all duration-200 ease-in-out',
              'radix-state-active:bg-gray-100 radix-state-active:text-black',
              'dark:text-white dark:radix-state-active:bg-gray-600 dark:radix-state-active:text-white',
            )}
          >
            {localize('com_ui_teacher_options_details_tab')}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="chartView"
            className={cn(
              'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm',
              'text-black transition-all duration-200 ease-in-out',
              'radix-state-active:bg-gray-100 radix-state-active:text-black',
              'dark:text-white dark:radix-state-active:bg-gray-600 dark:radix-state-active:text-white',
            )}
          >
            {localize('com_ui_teacher_options_chart_tab')}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="details">
          {isLoading ? (
            <Spinner className="m-auto h-14 animate-spin" />
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {/* Header row */}
              <div className="col-span-1 rounded bg-gray-100 p-2 font-bold dark:bg-gray-700">
                Area of Focus
              </div>
              <div className="col-span-1 rounded bg-gray-100 p-2 font-bold dark:bg-gray-700">
                Signal
              </div>
              <div className="col-span-2 rounded bg-gray-100 p-2 font-bold dark:bg-gray-700">
                Number of Issues Fixed
              </div>

              {/* Data rows */}
              {[
                { area: 'Paragraphs', signal: 'green', issues: 7 },
                { area: 'Spelling', signal: 'yellow', issues: 28 },
                { area: 'Basic Grammar', signal: 'yellow', issues: 17 },
                { area: 'Sentence Length', signal: 'green', issues: 2 },
                { area: 'On Topic', signal: 'green', issues: 1 },
                { area: 'Clarity', signal: 'red', issues: 0 },
              ].map((row, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-1 rounded bg-gray-50 p-2 dark:bg-gray-600">
                    {row.area}
                  </div>
                  <div className="col-span-1 rounded bg-gray-50 p-2 dark:bg-gray-600">
                    <Circle color={row.signal} />
                  </div>
                  <div className="col-span-2 rounded bg-gray-50 p-2 dark:bg-gray-600">
                    {row.issues}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </Tabs.Content>
        <Tabs.Content value="detailedView">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Summary of Errors Corrected</h2>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li>Punctuation Errors: 4 instances (Missing commas)</li>
              <li>
                Structural Issues: 3 instances (Parallel structure, sentence length, and clarity)
              </li>
              <li>Typographical Errors: 3 instances (Typographical errors, extraneous words)</li>
            </ul>

            <h2 className="mb-4 text-xl font-bold">Estimated Time Spent</h2>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li>Reading Tips and Making Corrections: 70 minutes</li>
            </ul>

            <h2 className="mb-4 text-xl font-bold">Example of the Most Complex Change Made</h2>
            <p className="mb-2">
              <strong>Original:</strong> On the teacher side there will be a dashboard that allows
              the teacher to see how students are using the platform (from full transparency to
              summaries of how much support has been provided what the student is working on and the
              progress on specific metrics over time).
            </p>
            <p className="mb-2">
              <strong>Change Made:</strong>On the teacher side there will be a dashboard that allows
              the teacher to see how students are using the platform. This includes full
              transparency to summaries of how much support has been provided, what the student is
              working on, and the progress on specific metrics over time.
            </p>
            <p>
              <strong>Explanation:</strong> The sentence was broken into two for better readability.
              The first part introduces the dashboard, and the second part lists the features and
              capabilities of the dashboard in a clearer manner.
            </p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="chartView">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Coming Soon</h2>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
