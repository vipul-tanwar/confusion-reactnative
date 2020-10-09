import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:' 
        })
    }
    

    render(){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                <Card 
                    titleStyle={{ fontSize: 16 }}
                    title='Contact Information' >
                    <Text style={{margin:0, lineHeight: 25, fontSize: 14, }} >{`
                        121, Clear Water Bay Road
                        Clear Water Bay, Kowloon
                        HONG KONG
                        Tel: +852 1234 5678
                        Fax: +852 8765 4321
                        Email:confusion@food.net 
                    `}</Text>
                    <Button 
                        title='  Send Email'
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                    />
                      
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact;
