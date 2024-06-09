'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';
import { setCookie } from '../utils/cookie';
import { useLoaderStore } from '@/stores/loaderStore';
import { showSuccessAlert } from '../utils/sweetalert';

type FieldType = {
    email?: string;
    password?: string;
};


export default function Login() {
    const { showLoading, hideLoading } = useLoaderStore()
    const [form] = Form.useForm()
    const router = useRouter()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            showLoading()
            let { data } = await axios.post(`/auth/signin`, {
                email: values.email,
                password: values.password
            })
            hideLoading()
            if (data?.data?.accessToken) {
                setCookie('access_token', data?.data?.accessToken, 1);
                setCookie('refresh_token', data?.data?.refreshToken, 7);
                await showSuccessAlert(data?.message)
                router.push('/')
            }
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
                    Login
                </div>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{}}
                    className='w-full flex flex-col p-3'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
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
                    <div className='w-full flex justify-center items-center gap-2'>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="default" onClick={() => router.push('/register')}>
                                Register
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}
