import React, { FC, PropsWithRef, useEffect } from 'react';
import { Modal, Tabs } from 'antd';

declare interface SettingRef {
  open: boolean;
  onClose: () => void;
}
const Setting: FC<SettingRef> = ({ open, onClose }: SettingRef) => {
  useEffect(() => {
    if (open) window.electron.system.layoutTop();
  }, [open]);
  return (
    <Modal
      title="设置"
      open={open}
      centered
      closable={false}
      mask={false}
      maskClosable={false}
      onOk={onClose}
      onCancel={onClose}
      afterClose={() => window.electron.system.mainTop()}
    >
      <Tabs
        tabPosition="left"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </Modal>
  );
};

export default Setting;
