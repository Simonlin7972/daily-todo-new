import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DailyReview: React.FC = () => {
  const { t } = useTranslation();
  const [recap, setRecap] = useState('');

  useEffect(() => {
    // 從 localStorage 獲取 recap
    const savedRecap = localStorage.getItem('dailyRecap');
    if (savedRecap) {
      setRecap(savedRecap);
      // 可選：清除 localStorage 中的 recap
      // localStorage.removeItem('dailyRecap');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('dailyReview')}</h1>
      
      {recap && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('todaysRecap')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{recap}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Add more content for the daily review page here */}
    </div>
  );
};
