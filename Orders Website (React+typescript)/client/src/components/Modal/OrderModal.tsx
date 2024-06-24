
import { Modal, MenuItem, Button, Select, Box } from '@mui/material';
import { OrderModalProps } from '@/Utils/Type';

import './OrderModal.css'

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, title, value, onChange, options, onUpdate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className='ModalBox'>
        <h2>{title}</h2>
        <Select fullWidth value={value} onChange={(e) => onChange(e.target.value as string)}>
          {options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={onUpdate}>Update</Button>
      </Box>
    </Modal>
  );
};

export default OrderModal;
