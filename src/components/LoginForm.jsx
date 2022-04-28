import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import firebase from "../services/firebase";

function LoginForm({ Login, error }) {
    const [phoneInput, setPhoneInput] = useState({phone: ""});
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const memberRef = firebase.database().ref('Members')
        
        memberRef.on('value', (snapshot) => {
            const members = snapshot.val();
            const memberList = [];
            for (let uuid in members) {
                memberList.push({uuid, ...members[uuid]});
            }
            setMemberList(memberList);
        });
    }, []);

    const submitHandler = e => {
        e.preventDefault();
        var member = GetMemberData(memberList, phoneInput);
        console.log(member);
        Login(member);
    }

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-group col-md-4 col-md-offset-5 align-center ">
                    {/* ERROR! */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <br/>
                            <div class="alert alert-success" role="alert">
                               Already a member? Check-in using your phone number below!
                            </div>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter registered phone"
                                onChange={(e) => {setPhoneInput(e.currentTarget.value)}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitHandler}>
                            CHECK IN
                        </Button>
                    </Form>
                    <br/><br/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <br/>
                            <div class="alert alert-secondary" role="alert">
                               Dropping in? Enter your full name and click drop in!
                            </div>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter full name"/>
                        </Form.Group>
                        <Button variant="secondary" type="submit" onClick={submitHandler}>
                            DROP IN
                        </Button>
                    </Form>
                </div>
            </div> 
        </div>

    )
}

function GetMemberData(memberList, phoneInput) {
    for (let member of memberList) {
        var memberPhone = member.phone;
        if (phoneInput === memberPhone) {
            return member;
        }
    }
    return null;
}

export default LoginForm