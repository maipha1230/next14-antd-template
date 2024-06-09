'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';
import { useLoaderStore } from '@/stores/loaderStore';

type FieldType = {
    email?: string;
    nameTh?: string;
    nameEn?: string;
    phone?: string;
    password?: string;
    password2?: string
};


import React from 'react'
import { showSuccessAlert } from '../utils/sweetalert';
function Register() {
    const router = useRouter()
    const [form] = Form.useForm();
    const { showLoading, hideLoading } = useLoaderStore()
    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
        if (values.password !== values.password2) {
            return 
        }

        let data = {
            email: values.email,
            nameTh: values.nameTh,
            nameEn: values.nameEn,
            phone: values.phone,
            password: values.password
        }

        try {
            showLoading()
            let response = await axios.post(`/auth/signup`, data)
            hideLoading()
            await showSuccessAlert(response.data?.message)
            form.resetFields()
            
        } catch (error) {
            hideLoading()
            console.log(error);
            
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-full min-h-screen h-auto flex flex-col p-3 bg-slate-300 items-center justify-center">
            <div className="w-full md:w-[450px] h-auto min-h-[200px] flex flex-col gap-2 bg-white rounded-md shadow-md">
                <div
                    className="w-full rounded-t-md bg-slate-700 text-white flex justify-center items-center font-bold py-3 text-xl">
                    Register
                </div>
                <Form
                    name="basic"
                    initialValues={{}}
                    className='w-full flex flex-col p-3'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Name Thai"
                        name="nameTh"
                        rules={[{ required: true, message: 'Please input your Name Thai!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Name English"
                        name="nameEn"
                        rules={[{ required: true, message: 'Please input your Name English!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Confrim Password"
                        name="password2"
                        rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className='w-full flex justify-center items-center gap-2'>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="default" onClick={() => router.push('/login')}>
                                Login
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register