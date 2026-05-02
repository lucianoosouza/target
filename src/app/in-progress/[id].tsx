import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { Button } from '@/components/Button';
import { targets } from '@/utils/targets';

export default function InProgress() {
    const params = useLocalSearchParams<{ id: string }>();
    const targetItem = targets.find((item) => item.id === params.id);

    const details = {
        current: targetItem?.current ?? 'R$ 0,00',
        target: targetItem?.target ?? 'R$ 0,00',
        percentage: Number((targetItem?.percentage ?? '0%').replace('%', '')),
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
            <View style={{ flex: 1, width: '100%', maxWidth: 420, alignSelf: 'center' }}>
                <PageHeader
                    title={targetItem?.name ?? 'Meta'}
                    rightButton={{
                        icon: 'edit',
                        onPress: () => { },
                    }}
                />

                <Progress data={details} />
            </View>

            <View style={{ width: '100%', maxWidth: 420, alignSelf: 'center' }}>
                <Button
                    title="Nova transação"
                    onPress={() => router.navigate(`/transaction/${params.id}`)}
                />
            </View>
        </View>
    );
}