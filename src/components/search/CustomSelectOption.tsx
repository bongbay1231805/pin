// components/Select/CustomSelectOption.tsx
import React from 'react';
import { components, OptionProps } from 'react-select'; // Import OptionProps
// Định nghĩa kiểu dữ liệu cho SelectOption mà component này sẽ nhận
// Đảm bảo kiểu này khớp với SelectOption trong SearchPostsDropdown.tsx
interface SelectOption {
  value: string;
  label: string;
  image?: string | null;
}
// Kiểu props cho CustomSelectOption
interface CustomOptionProps extends OptionProps<SelectOption> {
  // Không cần thêm 'data' ở đây vì OptionProps đã bao gồm data
}
const CustomSelectOption: React.FC<CustomOptionProps> = (props) => {
  const { data, innerProps, isFocused, isSelected } = props;
  const thumbnailStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    marginRight: '10px',
    borderRadius: '4px',
    objectFit: 'cover',
    flexShrink: 0,
  };
  const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: isFocused ? '#f0f0f0' : isSelected ? '#cfa176' : 'white',
    cursor: 'pointer',
  };
  return (
    <div {...innerProps} style={optionStyle}>
      {data.image && (
        <img
          src={`https://admin.pigroup.tqdesign.vn/storage/${data.image}`}
          alt={data.label}
          style={thumbnailStyle}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).style.display = 'none'; // Ẩn ảnh nếu lỗi
          }}
        />
      )}
      <span>{data.label}</span>
    </div>
  );
};
export default CustomSelectOption;