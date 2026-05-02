import { View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import CurrencyInput from 'react-native-currency-input';
import Input from '@/components/Input';
import { useState } from 'react';
import { colors } from '@/theme';
import { styles } from '@/components/Input/styles';


export default function Target() {
    // Estado controlado do valor monetário
    const [value, setValue] = useState<number | null>(0);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Meta"
                subtitle="Crie e gerencie suas metas financeiras"
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Exemplo: Viagem para a praia"
                />

                <View style={{ gap: 8 }}>
                    <CurrencyInput
                        style={styles.input}
                        placeholder="0,00"
                        placeholderTextColor={colors.gray[400]}
                        value={value}
                        onChangeValue={setValue}
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                    />
                </View>

                <Button
                    title="Salvar"
                />
            </View>
        </View>
    );
}