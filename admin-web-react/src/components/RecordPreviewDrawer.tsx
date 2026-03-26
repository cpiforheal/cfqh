import type { ReactNode } from 'react';
import { Drawer, Typography } from 'antd';
import { stringifyRecord } from '../utils';

type RecordPreviewDrawerProps = {
  open: boolean;
  title: string;
  record: Record<string, unknown> | null;
  width?: number;
  description?: ReactNode;
  onClose: () => void;
};

export function RecordPreviewDrawer({
  open,
  title,
  record,
  width = 560,
  description,
  onClose
}: RecordPreviewDrawerProps) {
  return (
    <Drawer open={open} width={width} title={title} onClose={onClose}>
      {description ? <Typography.Paragraph type="secondary">{description}</Typography.Paragraph> : null}
      <pre className="json-preview">{stringifyRecord(record)}</pre>
    </Drawer>
  );
}
