import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown, Meh, Smile } from 'lucide-react';

interface RecapData {
  text: string;
  mood: string;
}

export const DailyReview: React.FC = () => {
  const { t } = useTranslation();
  const [recap, setRecap] = useState<RecapData | null>(null);

  useEffect(() => {
    const savedRecap = localStorage.getItem('dailyRecap');
    if (savedRecap) {
      setRecap(JSON.parse(savedRecap));
    }
  }, []);

  const MoodIcon = ({ mood }: { mood: string }) => {
    switch (mood) {
      case 'bad':
        return <Frown size={24} />;
      case 'neutral':
        return <Meh size={24} />;
      case 'good':
        return <Smile size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {recap && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('todaysRecap')}
              <MoodIcon mood={recap.mood} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{recap.text}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Add more content for the daily review page here */}
    </div>
  );
};
