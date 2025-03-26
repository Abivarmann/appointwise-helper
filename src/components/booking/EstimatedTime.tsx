
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface EstimatedTimeProps {
  waitTime: number;
}

const EstimatedTime = ({ waitTime }: EstimatedTimeProps) => {
  const [remainingMinutes, setRemainingMinutes] = useState(waitTime);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Start with the full wait time
    setRemainingMinutes(waitTime);
    setProgress(100);
    
    // Set up an interval to decrease the time every minute (or faster for demo)
    const interval = setInterval(() => {
      setRemainingMinutes(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      
      setProgress(prev => {
        const newProgress = (prev - (100 / waitTime));
        return newProgress < 0 ? 0 : newProgress;
      });
    }, 3000); // Update every 3 seconds for demo purposes
    
    return () => clearInterval(interval);
  }, [waitTime]);
  
  const getEstimatedArrivalTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + remainingMinutes);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-card">
      <h3 className="text-base font-medium mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-primary" />
        Estimated Wait Time
      </h3>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-medium text-primary inline-block py-1">
              Arriving by:
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-primary inline-block">
              {getEstimatedArrivalTime()}
            </span>
          </div>
        </div>
        
        <div className="relative">
          {/* Background track */}
          <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/10">
            {/* Progress bar */}
            <motion.div 
              style={{ width: `${progress}%` }} 
              className="bg-primary h-full rounded"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Circle indicator */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow"
            style={{ left: `calc(${progress}% - 8px)` }}
            initial={{ left: "calc(100% - 8px)" }}
            animate={{ left: `calc(${progress}% - 8px)` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-3xl font-bold text-primary">{remainingMinutes}</span>
        <span className="text-sm text-muted-foreground"> minutes</span>
        
        <p className="text-xs text-muted-foreground mt-1">
          Recommended arrival time to minimize waiting
        </p>
      </div>
    </div>
  );
};

export default EstimatedTime;
