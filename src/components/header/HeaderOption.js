import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './HeaderOption.css';

const HeaderOption = ({ title, Icon, avatar, onClick }) => {

  const user = useSelector(selectUser);

  return (
    <div className='headerOption' onClick={onClick}>
        {Icon && <Icon className='headerOption__icon' />}
        {avatar && (
            <Avatar className='headerOption__icon' src={user?.photoUrl} >{user?.email[0]}</Avatar>
        )}
        <h3 className='headerOption__title'>{title}</h3>
    </div>
  );
};

export default HeaderOption;
