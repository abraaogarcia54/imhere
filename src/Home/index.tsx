
import React, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList,Alert } from "react-native";
import { styles } from "./styles";

import { Participant } from "../components/participant";

export function Home() {
  const [participants, setparticipants] =  useState<string[]>([]);
  const [participantName, setparticipantName] = useState ('');


  function handleParticipantAdd() {
    if(participants.includes(participantName)){
      return Alert.alert("Participante Existe", "já existe um participante na lista com esse nome.")
    }

    setparticipants( prevState => [...prevState, participantName]);
    setparticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover",`Remover o participante ${name}?` , [
      {
        text: 'Sim',
        onPress: () => setparticipants(prevState => prevState.filter(Participant => Participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.eventName}>
        Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor={"#6b6b6b"}
          onChangeText={setparticipantName}
          value={participantName} />


        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença</Text>
        )}
      />



    </View>


  )
}