import React, { useState } from 'react';
interface ApplicationFormPopupProps {
  isOpen: boolean; // Trạng thái đóng/mở popup
  onClose: () => void; // Hàm để đóng popup, không trả về giá trị nào
  selectedPosition: string; // Vị trí ứng tuyển đã chọn
  allJobData: any;
}
const ApplicationFormPopup: React.FC<ApplicationFormPopupProps> = ({ isOpen, onClose, selectedPosition, allJobData }) => {
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState(selectedPosition || '');
  const [cvFile, setCvFile] = useState<File | null>(null); // Kiểu File hoặc null
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fileError, setFileError] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const MAX_FILE_SIZE_MB = 5; // 5MB
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/zip'
  ];
  const availablePositions = Array.from(new Set(allJobData.map((job: any) => job.position)));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Dùng optional chaining
    setFileError('');
    setCvFile(null);
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Kích thước file không được vượt quá ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('Chỉ cho phép file PDF, DOCX, hoặc ZIP.');
      return;
    }
    setCvFile(file);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('');
    if (!fullName || !position || !cvFile) {
      setSubmissionStatus('Vui lòng điền đầy đủ thông tin và đính kèm CV.');
      return;
    }
    if (fileError) {
      setSubmissionStatus('Vui lòng sửa lỗi file CV.');
      return;
    }
    console.log('Hồ sơ ứng tuyển:', {
      fullName,
      position,
      phone,
      email,
      cvFileName: cvFile.name,
      cvFileSize: (cvFile.size / 1024 / 1024).toFixed(2) + ' MB',
      cvFileType: cvFile.type,
    });
    setSubmissionStatus('Hồ sơ đang được gửi...');
    setTimeout(() => {
      setSubmissionStatus('Hồ sơ của bạn đã được gửi thành công!');
      // onClose(); // Có thể đóng popup sau khi gửi thành công
    }, 1500);
  };
  return (
    <div className={`fixed -z-10 opacity-0 overflow-hidden ${isOpen ? "inset-0 opacity-100 bg-blue-1/50  flex justify-center items-center z-50" : "" }`}>
      <div
        style={{
          '--tw-translate-y': isOpen ? '0px' : '100%',
          transform: `translateY(var(--tw-translate-y))`,
          transition: 'transform 1s ease-out'
        }}
        className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4`}>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-[28px] uppercase">Nộp Hồ Sơ Ứng Tuyển</h3>
          <h2 className='uppercase text-[45px] text-yellow-1 font-bold'>ứng tuyển</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={fullName}
              placeholder='Họ & tên'
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none sm:text-sm"
              value={phone}
              placeholder='Số điện thoại'
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              {/* Thêm một option mặc định nếu bạn muốn */}
              {/* <option value="" disabled>-- Chọn vị trí --</option> */}
              {availablePositions.map((pos, index) => (
                <option key={index} value={pos as string}>{pos as string}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="file"
                id="cvFile"
                accept=".pdf,.doc,.docx,.zip"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                required
              />
              <div className="flex justify-between items-center pl-4  border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-pointer">
                {cvFile ? (
                  <span className="text-gray-700 truncate">{cvFile.name}</span>
                ) : (
                  <span className="text-gray-400">File CV: (PDF, DOCX, ZIP)</span>
                )}
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.6189 17.0397L16.4677 23.6103C15.9458 24.1933 15.2032 24.5305 14.4208 24.5396C13.6384 24.5487 12.8882 24.2288 12.353 23.6581C11.1706 22.4238 11.1905 20.4712 12.3977 19.2613L20.6595 10.426C21.5708 9.41141 22.8678 8.82845 24.2315 8.82053C25.5953 8.8126 26.899 9.38044 27.822 10.3843C29.7909 12.5602 29.7769 15.8781 27.7897 18.0372L19.0299 27.3966C17.7832 28.648 16.0768 29.3315 14.311 29.2869C12.5452 29.2423 10.8755 28.4734 9.69358 27.1608C6.99205 24.1135 7.05889 19.5093 9.84775 16.5418L18.1219 7.70801" stroke="#C48C5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {fileError && (
              <p className="mt-1 text-sm text-red-600">{fileError}</p>
            )}
            {cvFile && !fileError && (
              <p className="mt-1 text-sm text-gray-500">
                Đã chọn: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          {submissionStatus && (
            <p className={`mb-4 text-center text-sm ${submissionStatus.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
              {submissionStatus}
            </p>
          )}
          <div className="flex justify-start space-x-3">
            <button
              type="submit"
              className="hvr-bounce-to-right sm:flex items-center justify-center text-yellow-1 text-[16px] font-semibold w-[150px] h-[35px] border border-yellow-1 hover:text-white  focus:text-white"
              disabled={!!fileError || !fullName || !position || !cvFile}
            >
              Nộp hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationFormPopup;