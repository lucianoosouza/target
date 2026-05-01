import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/Input';
export default function Target() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, padding: 24 }}>
                <PageHeader
                    title="Meta"
                    subtitle="Crie e gerencie suas metas financeiras"
                    rightButton={{
                        icon: 'edit',
                        onPress: () => { },
                    }}
                />
                <View style={{ marginTop: 32, gap: 24 }}>
                    <Input label="Nome da meta"
                        placeholder="Exemplo: Viagem para a praia" />
                    <Button title="Salvar" />
                </View>

            </View >

        </View >

    );
}