/**
 * Google Sheets Form Handler
 * Gửi dữ liệu từ form Lưu bút và RSVP đến Google Sheets
 *
 * HƯỚNG DẪN SETUP:
 * 1. Tạo Google Sheet mới tại https://sheets.google.com
 * 2. Tạo 2 sheet với tên: "LuuBut" và "ThamDu"
 * 3. Thêm header cho sheet "LuuBut": Thời gian | Họ tên | Lời chúc
 * 4. Thêm header cho sheet "ThamDu": Thời gian | Họ tên | Email | SĐT | Số người | Tham dự | Khách của
 * 5. Vào Extensions > Apps Script
 * 6. Paste code bên dưới vào Apps Script và Deploy as Web App
 * 7. Copy URL web app và paste vào biến GOOGLE_SCRIPT_URL bên dưới
 *
 * CODE CHO GOOGLE APPS SCRIPT:
 * =============================
 * function doPost(e) {
 *   var lock = LockService.getScriptLock();
 *   lock.tryLock(10000);
 *
 *   try {
 *     var data = JSON.parse(e.postData.contents);
 *     var ss = SpreadsheetApp.getActiveSpreadsheet();
 *     var sheet = ss.getSheetByName(data.sheetName);
 *
 *     if (!sheet) {
 *       return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Sheet not found'}))
 *         .setMimeType(ContentService.MimeType.JSON);
 *     }
 *
 *     sheet.appendRow(data.row);
 *
 *     return ContentService.createTextOutput(JSON.stringify({success: true}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } finally {
 *     lock.releaseLock();
 *   }
 * }
 *
 * function doGet(e) {
 *   var ss = SpreadsheetApp.getActiveSpreadsheet();
 *   var sheet = ss.getSheetByName('Lưu Bút');
 *   var data = sheet.getDataRange().getValues();
 *   var comments = [];
 *
 *   for (var i = 1; i < data.length; i++) {
 *     comments.push({
 *       timestamp: data[i][0],
 *       name: data[i][1],
 *       comment: data[i][2]
 *     });
 *   }
 *
 *   return ContentService.createTextOutput(JSON.stringify({success: true, comments: comments.reverse()}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * =============================
 */

(function() {
    // ⚠️ THAY URL NÀY BẰNG URL WEB APP CỦA BẠN
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaxoApXoXqWsj22UcczEScpx0xY2sDrfHcVbe2Ke2SOUTE-g1DZMW_6JehskSt0-JA/exec';

    // Toast notification
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'gsheet-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            z-index: 99999;
            animation: fadeInOut 3s ease-in-out;
            background: ${type === 'error' ? '#dc2626' : '#22c55e'};
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            15% { opacity: 1; transform: translateX(-50%) translateY(0); }
            85% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    // Format timestamp
    function getTimestamp() {
        const now = new Date();
        return now.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Send data to Google Sheets
    async function sendToGoogleSheets(sheetName, row) {
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            showToast('Vui lòng cấu hình Google Script URL!', 'error');
            console.error('Chưa cấu hình GOOGLE_SCRIPT_URL trong js/google-sheets-form.js');
            return false;
        }

        try {
            // Use form data with redirect method for better CORS compatibility
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = GOOGLE_SCRIPT_URL;
            form.target = 'hidden_iframe';

            const sheetInput = document.createElement('input');
            sheetInput.type = 'hidden';
            sheetInput.name = 'sheetName';
            sheetInput.value = sheetName;
            form.appendChild(sheetInput);

            const rowInput = document.createElement('input');
            rowInput.type = 'hidden';
            rowInput.name = 'row';
            rowInput.value = JSON.stringify(row);
            form.appendChild(rowInput);

            // Create hidden iframe if not exists
            let iframe = document.getElementById('hidden_iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'hidden_iframe';
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }

            document.body.appendChild(form);
            form.submit();
            form.remove();

            console.log('Form submitted to Google Sheets');
            return true;
        } catch (error) {
            console.error('Error sending to Google Sheets:', error);
            return false;
        }
    }

    // Load comments from Google Sheets
    async function loadComments() {
        // Disabled: Loading comments requires CORS which may not work with all deployments
        // Comments will be shown locally after submission instead
        return;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Handle Comment Form (Sổ lưu bút)
    function initCommentForm() {
        const form = document.getElementById('commentForm');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value.trim();
            const comment = document.getElementById('comment').value.trim();

            if (!fullname || !comment) {
                showToast('Vui lòng nhập đầy đủ thông tin!', 'error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';

            const success = await sendToGoogleSheets('Lưu Bút', [
                getTimestamp(),
                fullname,
                comment
            ]);

            if (success) {
                showToast('Cảm ơn bạn đã gửi lời chúc!', 'success');
                form.reset();

                // Add comment to list immediately
                const commentList = document.getElementById('commentList');
                if (commentList) {
                    const newComment = document.createElement('div');
                    newComment.className = 'comment-item';
                    newComment.innerHTML = `
                        <div class="comment-name">${escapeHtml(fullname)}</div>
                        <div class="comment-text">${escapeHtml(comment)}</div>
                        <div class="comment-time">Vừa xong</div>
                    `;
                    commentList.insertBefore(newComment, commentList.firstChild);
                }
            } else {
                showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
            }

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }

    // Handle RSVP Form
    function initRSVPForm() {
        const form = document.getElementById('miu-rsvp-form');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const guestName = formData.get('guestName')?.trim();

            if (!guestName) {
                showToast('Vui lòng nhập họ tên!', 'error');
                return;
            }

            const submitBtn = document.getElementById('miu-rsvp-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';

            const willAttend = formData.get('willAttend') === 'yes' ? 'Có' : 'Không';
            const eventType = formData.get('eventType') === 'nhatrai' ? 'Chú rể' : 'Cô dâu';

            const success = await sendToGoogleSheets('Tham Dự', [
                getTimestamp(),
                guestName,
                formData.get('guestEmail') || '',
                formData.get('guestPhone') || '',
                formData.get('numberOfGuests') || '1',
                willAttend,
                eventType
            ]);

            if (success) {
                showToast('Cảm ơn bạn đã xác nhận!', 'success');
                form.reset();
            } else {
                showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
            }

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initCommentForm();
            initRSVPForm();
            loadComments();
        });
    } else {
        initCommentForm();
        initRSVPForm();
        loadComments();
    }
})();
