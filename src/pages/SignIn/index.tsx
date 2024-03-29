import React, {useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from './../../assets/Logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, Content, Background} from './styles';

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);


    const handleSubmit = useCallback ( async(data: object) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email(),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });



        }catch(err){
            console.log(err);

            const errors = getValidationErrors(err as Yup.ValidationError);
            formRef.current?.setErrors(errors);
        }
    },[]);

    
    return (
        <Container>
            <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>

                <Input icon={FiMail} name='email' placeholder="E-mail" />

                <Input icon={FiLock}name='password' type="Password"placeholder="Senha" ></Input>
                <Button type="submit">Entrar</Button>

                <a href="">Esqueci minha senha</a>
            </Form>
            <a href="login">
                <FiLogIn/>
                Criar conta
            </a>
            </Content>
            <Background/>
        </Container>
    );
};

export default SignIn;