'use client';
import FadeIn from './anim/FadeIn';
import { useState } from 'react';
import { submitToGoogleSheets } from '@/utils/googleSheets';

export default function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const guestName = formData.get('guestName') as string;
    const guestEmail = formData.get('guestEmail') as string || '';
    const guestPhone = formData.get('guestPhone') as string || '';
    const numberOfGuests = formData.get('numberOfGuests') as string || '1';
    const willAttend = formData.get('willAttend') === 'yes' ? 'Có' : 'Không';
    const eventType = formData.get('eventType') === 'nhatrai' ? 'Chú rể' : 'Cô dâu';

    const timestamp = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const result = await submitToGoogleSheets('Tham Dự', [
        timestamp,
        guestName,
        guestEmail,
        guestPhone,
        numberOfGuests,
        willAttend,
        eventType
    ]);

    setIsSubmitting(false);
    if (result.success) {
        setSubmitted(true);
    } else {
        alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <div id="card-rsvp" className="card-section rsvp-section" style={{ order: 12 }}>
        <div className="inner">
            <FadeIn direction="up" className="rsvp-card">
                <h2 className="rsvp-title">Xác Nhận Tham Dự</h2>
                <div className="rsvp-subtitle">Việc xác nhận giúp chúng mình chuẩn bị chu đáo hơn. Cảm ơn bạn!</div>
                
                {!submitted ? (
                    <form className="rsvp-form" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" name="guestName" placeholder="Họ và tên *" required className="w-full px-4 py-2 border rounded-md" />
                            <input type="email" name="guestEmail" placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
                            <input type="tel" name="guestPhone" placeholder="Số điện thoại" className="w-full px-4 py-2 border rounded-md" />
                            <input type="number" name="numberOfGuests" min="1" max="20" placeholder="Số người tham dự" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="willAttend" value="yes" defaultChecked className="accent-[var(--color-primary)] w-4 h-4" /> 
                                    <span>Có, tôi sẽ tham dự</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="willAttend" value="no" className="accent-[var(--color-primary)] w-4 h-4" /> 
                                    <span>Xin lỗi, tôi bận mất rồi!</span>
                                </label>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="eventType" value="nhatrai" defaultChecked className="accent-[var(--color-primary)] w-4 h-4" /> 
                                    <span>Khách của chú rể</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="eventType" value="nhagai" className="accent-[var(--color-primary)] w-4 h-4" /> 
                                    <span>Khách của cô dâu</span>
                                </label>
                            </div>
                        </div>
                        <div className="actions text-center">
                            <button className="btn-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Đang gửi...' : 'Xác nhận'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center p-8 text-green-600 font-bold">
                        Cảm ơn bạn đã xác nhận tham dự!
                    </div>
                )}
            </FadeIn>
        </div>
    </div>
  );
}
