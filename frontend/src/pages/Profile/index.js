import React from 'react'
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import styles from './style.module.css'
import { useState } from 'react'

const ProfilePage = () => {

    const getLocal = JSON.parse(localStorage.getItem('userInfo'))


    const [name, setName] = useState(getLocal.username)
    const [id, setId] = useState('123456')
    const [phone, setPhone] = useState('09751547')
    const [email, setEmail] = useState('lam@gmail.com')
    const [position, setPosition] = useState('Manager')

    const info = [
        {
            key: 'Name',
            value: name
        },
        {
            key: 'ID',
            value: id
        },
        {
            key: 'Phone',
            value: phone
        },
        {
            key: 'Email',
            value: email
        },
        {
            key: 'Position',
            value: position
        },
    ]

    const handleChange = (event, index) => {
        if(index === 0) {
            setName(event.target.value)
        }

        if(index === 1) {
            setId(event.target.value)
        }

        if(index === 2) {
            setPhone(event.target.value)
        }

        if(index === 3) {
            setEmail(event.target.value)
        }

        if(index === 4) {
            setPosition(event.target.value)
        }
    }
    return (
        <Stack border='3px solid #0E1B6B' borderRadius='8px' m='0 100px' justifyContent='center' alignItems='center'>
            <Typography fontSize='27px' fontWeight={600} color='#0E1B6B'>{name}</Typography>
            <img
                className={styles.myImage}
                src={getLocal.avatar}
                alt='image-profile'
            />
            <Stack>
                {
                    info.map((child, index) => {
                        return (
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '50ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Typography fontSize='15px'>{child.key}</Typography>
                                <TextField onChange={(e) => handleChange(e, index)} size='normal' id="outlined-basic" label={child.value} variant="outlined" />
                            </Box>
                        )
                    })
                }

                <Stack flexDirection='row' justifyContent='flex-end'>
                    <Stack spacing={2} direction="row" mr='1px' p='10px'>
                        <Button fontSize='20px' variant="contained">Edit</Button>
                    </Stack>
                    <Stack spacing={2} direction="row" p='10px'>
                        <Button fontSize='20px' variant="contained">Save</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ProfilePage