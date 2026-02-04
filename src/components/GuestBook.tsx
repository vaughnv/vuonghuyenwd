'use client';
import FadeIn from './anim/FadeIn';
import { useState } from 'react';
import { submitToGoogleSheets } from '@/actions/googleSheets';

export default function GuestBook() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const fullname = formData.get('fullname') as string;
    const comment = formData.get('comment') as string;

    const timestamp = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const result = await submitToGoogleSheets('Lưu Bút', [timestamp, fullname, comment]);
    
    setIsSubmitting(false);
    if (result.success) {
        setSubmitted(true);
    } else {
        alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <div id="card-comments" style={{ order: 10 }}>
        <img src="/images/bg5.webp" className="decor-flower-right" alt="" />
        <img src="/images/bg6.webp" className="decor-flower-left" alt="" />

        <div className="inner">
            <FadeIn direction="down">
                <h2 className="card-section-title">Sổ lưu bút</h2>
            </FadeIn>
            <FadeIn direction="right">
                <div className="card-section-subtitle">
                    Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng tôi!
                </div>
            </FadeIn>

            {!submitted ? (
                <FadeIn className="comment-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <input 
                                type="text" 
                                name="fullname"
                                className="form-control w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] placeholder:text-gray-500 text-gray-800" 
                                placeholder="Nhập tên của bạn*" 
                                required 
                            />
                        </div>
                        <div className="form-group mb-6">
                            <textarea 
                                name="comment"
                                className="form-control w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] placeholder:text-gray-500 text-gray-800 min-h-[120px]" 
                                placeholder="Nhập lời chúc của bạn*" 
                                required 
                                rows={3}
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
                            </button>
                        </div>
                    </form>
                </FadeIn>
            ) : (
                <div className="text-center p-8 text-[var(--color-primary)] font-bold">
                    Cảm ơn bạn đã gửi lời chúc!
                </div>
            )}
        </div>
    </div>
  );
}
