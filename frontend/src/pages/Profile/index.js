import React from 'react'
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import styles from './style.module.css'
import { useState } from 'react'

const ProfilePage = () => {
    const [name, setName] = useState('Lê Văn Lâm')
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
        <Stack border='3px solid #0E1B6B' borderRadius='8px' m='0 300px' justifyContent='center' alignItems='center'>
            <Typography fontSize='27px' fontWeight={600} color='#0E1B6B'>Lê Văn Lâm</Typography>
            <img
                className={styles.myImage}
                src='https://s3-alpha-sig.figma.com/img/e4ea/ed6e/47d836180341759dd897537cf183719e?Expires=1670803200&Signature=KdkqJFgAOhzS6FYFAuU-8-zE0nqZ2wGVVHt18C7BN8YDFRrdACj6TdesSxgmDBAf7GqSU7770VCux0gQ-Jl~h9h41kFFLiDQ-HRDA4RSrwO0IBRQuDodcXuetjwuOZRpIk8Er3D8rmNYyWVrfx1P4lDzex7KISKbXmOpIohuNigAtgrDcaaecGNL82NCpMe8nX7ovXRrYoo93TzGEpkTk1G~KKUXe~n3KxTjlf50SYLWH2Al2waeUTNVQiz~31HL9nXHkFxvVzxecRVhjGKtItHqT~RCyA6PO1opAvkiGdXMkdbj9DocpDHFxCCEh7TLdMcVjSqNFOESx1bDS3raVg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
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