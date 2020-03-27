import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png'
import { composeAsync as MailCompose } from 'expo-mail-composer'

import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();

    const {incident} = route.params;
    const incident_value = Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value);

    const message = `Olá ${incident.ong.name}, estou entrando em contato pois gostaria de ajuda no caso "${incident.title}" com o valor de ${incident_value}`;

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailCompose({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [
                incident.ong.email
            ],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${incident.ong.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041">

                    </Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG: </Text>
                <Text style={styles.incidentValue}>
                    {incident.ong.name} de {incident.ong.city}/{incident.ong.uf}
                    </Text>


                <Text style={styles.incidentProperty}>CASO: </Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>


                <Text style={styles.incidentProperty}>Valor: </Text>
                <Text style={styles.incidentValue}>{incident_value}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato: </Text>


                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View> 
            </View>

        </View>
    )
}