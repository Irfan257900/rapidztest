import React from 'react';
import { Typography } from 'antd';
import { theme } from '../../theme';

const { Title, Paragraph } = Typography;

const HelpCenter = () => {
  return (
    <div className={`bg-white p-6 rounded shadow-md`}>
      <Title className={`text-${theme.colors.secondary} font-bold`}>Help Center</Title>
      <div className={`mt-4`}>
        <Title level={2}>Frequently Asked Questions</Title>
        <div className={`mb-4`}>
          <Title level={3}>How do I add funds?</Title>
          <Paragraph>To add funds, go to your wallet section and select 'Add Funds'. Follow the instructions provided.</Paragraph>
        </div>
        <div className={`mb-4`}>
          <Title level={3}>What is KYC?</Title>
          <Paragraph>KYC stands for 'Know Your Customer'. It is a process of verifying the identity of our users.</Paragraph>
        </div>
        <div className={`mb-4`}>
          <Title level={3}>How do I reset my password?</Title>
          <Paragraph>You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;