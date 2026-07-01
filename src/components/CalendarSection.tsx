'use client';
import { motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';
import { useCountdown } from '@/hooks/useCountdown';
import { Heart } from 'lucide-react';

const targetDate = new Date('2026-08-09T07:15:00');

export default function CalendarSection() {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const renderCalendar = () => {
     const weeks = [
       [null, null, null, null, null, null, 1],
       [2, 3, 4, 5, 6, 7, 8],
       [9, 10, 11, 12, 13, 14, 15],
       [16, 17, 18, 19, 20, 21, 22],
       [23, 24, 25, 26, 27, 28, 29],
       [30, 31, null, null, null, null, null]
     ];

     return (
       <table>
         <thead>
           <tr>
             <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
           </tr>
         </thead>
         <tbody>
           {weeks.map((week, i) => (
             <tr key={i}>
               {week.map((day, j) => {
                 if (!day) return <td key={j} className="empty"></td>;
                 
                 const isSpecial = day === 7 || day === 9;
                 
                 return (
                    <td key={j}>
                        {isSpecial ? (
                            <div className="relative w-[30px] h-[30px] mx-auto flex items-center justify-center">
                                <Heart className="absolute inset-0 w-full h-full text-[var(--color-primary)] fill-[var(--color-primary)]" />
                                <span className="relative z-10 text-white font-bold">{day}</span>
                            </div>
                        ) : (
                            day
                        )}
                    </td>
                 );
               })}
             </tr>
           ))}
         </tbody>
       </table>
     );
  };

  return (
    <div id="card-calendar" style={{ order: 5 }}>
        <div className="inner">
            <div className="calendar-header">
                <FadeIn direction="up" className="year">2026</FadeIn>
                <FadeIn direction="up" className="month">August</FadeIn>
            </div>
            
            <div id="mini-calendar" className="mini_calendar">
                {renderCalendar()}
            </div>

            <div id="countdown">
                 <FadeIn direction="up" className="countdown-title">
                     We’ll be sharing a home and a life<br/>together in
                 </FadeIn>
                 <FadeIn direction="up" className="countdown-inner">
                     <div className="box"><div className="value">{formatNumber(days)}</div></div>
                     <div className="colon">:</div>
                     <div className="box"><div className="value">{formatNumber(hours)}</div></div>
                     <div className="colon">:</div>
                     <div className="box"><div className="value">{formatNumber(minutes)}</div></div>
                     <div className="colon">:</div>
                     <div className="box"><div className="value">{formatNumber(seconds)}</div></div>
                 </FadeIn>
            </div>
        </div>
    </div>
  );
}
