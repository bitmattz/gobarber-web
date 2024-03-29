import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import {FormHandles} from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from './../../assets/Logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, Content, Background} from './styles';

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);



    const handleSubmit = useCallback ( async(data: object) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email(),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
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
        <Background/>

        <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name='name' placeholder="Nome" />

            <Input icon={FiMail} name='email' placeholder="E-mail" />

            <Input icon={FiLock} name='password' type="Password"placeholder="Senha" ></Input>
            <Button type="submit">Cadastrar</Button>

        </Form>
        <a href="login">
            <FiArrowLeft/>
            Voltar para logon
        </a>
        </Content>
    </Container>
    );
};

export default SignUp;