import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import CurrencyInput from 'react-native-currency-input';
import Input from '@/components/Input';
import { TransactionType } from '@/components/TransactionType';
import { TransactionTypes } from '@/utils/transaction-types';
import { useState } from 'react';


export default function Transaction() {
    const params = useLocalSearchParams<{ id: string }>();
    const [value, setValue] = useState<number | null>(0);
    const [type, setType] = useState(TransactionTypes.INPUT);

    return (

        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Nova transação"
                subtitle="Registre um valor para guardar ou retirar dessa meta"
            />
            <View style={{ marginTop: 32, gap: 24 }}>
                <TransactionType
                    selected={type}
                    onChange={setType}
                />
                <CurrencyInput
                    label="Valor"
                    value={0}
                />
                <Input
                    label="Motivo (opcional)"
                    placeholder="Exemplo: Aplicação no CDB"
                />
                <Button title="Salvar" />
            </View>
        </View >
    );
}