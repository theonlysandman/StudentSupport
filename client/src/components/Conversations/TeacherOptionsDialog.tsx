import { useLocalize } from '~/hooks';

import { useCreateSharedLinkMutation } from '~/data-provider';
import { useEffect, useState } from 'react';
import { TSharedLink } from 'librechat-data-provider';
import { useToastContext } from '~/Providers';
import { NotificationSeverity } from '~/common';
import { Spinner } from '~/components/svg';

export default function TeacherOptionsDialog({
  conversationId,
  title,
  share,
  setShare,
  setDialogOpen,
  isUpdated,
}: {
  conversationId: string;
  title: string;
  share: TSharedLink | null;
  setShare: (share: TSharedLink | null) => void;
  setDialogOpen: (open: boolean) => void;
  isUpdated: boolean;
}) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { mutate, isLoading } = useCreateSharedLinkMutation();

  const Circle = ({ color }) => {
    const colorMap = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
    };

    return <div className={`mx-auto h-6 w-6 rounded-full ${colorMap[color]}`}></div>;
  };

  console.log('TeacherOptionsDialog rendered', { conversationId, title, share, isUpdated });

  useEffect(() => {
    if (isLoading || share) {
      return;
    }
    const data = {
      conversationId,
      title,
      isAnonymous: true,
    };

    mutate(data, {
      onSuccess: (result) => {
        setShare(result);
      },
      onError: () => {
        showToast({
          message: localize('com_ui_teacher_options_error'),
          severity: NotificationSeverity.ERROR,
          showIcon: true,
        });
        setDialogOpen(false);
      },
    });

    // mutation.mutate should only be called once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto bg-gray-800 p-4 text-white">
      {/* Your existing content as header */}
      <div className="mb-4">
        <div className="h-full py-2">
          {(() => {
            if (isLoading) {
              return <Spinner className="m-auto h-14 animate-spin" />;
            }
            return localize('com_ui_teacher_options_details_heading');
          })()}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Header row */}
        <div className="col-span-1 bg-gray-700 p-2 font-bold">Area of Focus</div>
        <div className="col-span-1 bg-gray-700 p-2 font-bold">Signal</div>
        <div className="col-span-2 bg-gray-700 p-2 font-bold">Number of Issues Fixed</div>

        {/* Data rows */}
        <div className="col-span-1 bg-gray-700 p-2">Paragraphs</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="green" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">7</div>

        <div className="col-span-1 bg-gray-700 p-2">Spelling</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="yellow" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">28</div>

        <div className="col-span-1 bg-gray-700 p-2">Basic Grammar</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="yellow" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">17</div>

        <div className="col-span-1 bg-gray-700 p-2">Sentence Length</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="green" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">2</div>

        <div className="col-span-1 bg-gray-700 p-2">On Topic</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="green" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">1</div>

        <div className="col-span-1 bg-gray-700 p-2">Clarity</div>
        <div className="col-span-1 bg-gray-700 p-2">
          <Circle color="red" />
        </div>
        <div className="col-span-2 bg-gray-700 p-2">0</div>
      </div>
    </div>
  );
}
