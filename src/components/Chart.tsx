import { getTranslation, getTranslationStatic } from '@services/languageHelper';
import { setHoverFeatures } from '@store/reducer';
import {
    selectAttribute,
    selectCategory,
    selectFeatures,
} from '@store/selectors';
import React, { FC, PureComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
    Label,
    LabelList,
} from 'recharts';

type ChartProps = {
    title?: string;
};
const Chart: FC<ChartProps & React.ComponentProps<'button'>> = ({
    title = 'Default',
    ...props
}) => {
    const dispatch = useDispatch();
    const features = useSelector(selectFeatures);
    const attribute = useSelector(selectAttribute);
    const category = useSelector(selectCategory);

    const [data, setData] = useState<any>(null);
    const [translations, setTranslations] = useState<any>(null);

    const orderArray: any = {
        bioQuality: [
            'natural (1.0 - 1.4)',
            'obstructed (1.5 - 1.9)',
            'strongly obstructed (2.0 - 2.4)',
            'artificial (2.5 - 3.0)',
        ],
        waterQuality: [
            'unpolluted - I',
            'slightly polluted - I-II',
            'moderately polluted - II',
            'seriously polluted - II-III',
            'heavily polluted - III',
            'very heavily polluted - III-IV',
            'excessively polluted - IV',
        ],
        waterToBio: [
            'unpolluted - I',
            'slightly polluted - I-II',
            'moderately polluted - II',
            'seriously polluted - II-III',
            'heavily polluted - III',
            'very heavily polluted - III-IV',
            'excessively polluted - IV',
        ],
    };

    const categoryToCharType: any = {
        bioQuality: 'bar',
        waterQuality: 'bar',
        waterToBio: 'line',
    };

    useEffect(() => {
        parseData(features);
    }, [features]);

    const tickFormatter = (value: string, index: number) => {
        const limit = 10; // put your maximum character
        if (value.length < limit) return value;
        return `${value.substring(0, limit)}...`;
    };

    const parseData = (features: any) => {
        const dataTemp = [];
        const translationsTemp: any = {};

        for (const i in features) {
            if (
                features[i].attributes[attribute] != null &&
                features[i].attributes[attribute] != ''
            ) {
                translationsTemp[
                    getTranslationStatic(features[i].attributes[attribute])
                ] = features[i].attributes[attribute];
                dataTemp.push({
                    name: getTranslationStatic(
                        features[i].attributes[attribute]
                    ),
                    value:
                        Math.round(
                            features[i].attributes.count_Attribute * 100
                        ) / 100,
                });
            }
        }

        // Custom sorting function based on the orderArray
        const customSort = (a: any, b: any) => {
            return (
                orderArray[category].indexOf(translationsTemp[a.name]) -
                orderArray[category].indexOf(translationsTemp[b.name])
            );
        };

        // Sort the data based on the customSort function
        const sortedData = [...dataTemp].sort(customSort);
        setData(sortedData);
        setTranslations(translationsTemp);
    };

    let chart;
    if (categoryToCharType[category] == 'bar') {
        chart = (
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickFormatter={tickFormatter}></XAxis>
                <YAxis>
                    <Label
                        value={getTranslation('amount')}
                        offset={0}
                        position="insideLeft"
                        angle={-90}
                    />
                </YAxis>
                <Tooltip />
                <Bar
                    dataKey="value"
                    fill="#A2C367"
                    onMouseOver={(event) => {
                        dispatch(setHoverFeatures(translations[event.name]));
                    }}
                    onMouseOut={(event) => {
                        dispatch(setHoverFeatures(null));
                    }}
                    activeBar={<Rectangle fill="#79924e" />}
                >
                    <LabelList dataKey="value" position="top" />
                </Bar>
            </BarChart>
        );
    } else if (categoryToCharType[category] == 'line') {
        chart = (
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickFormatter={tickFormatter}></XAxis>
                <YAxis>
                    <Label
                        value={getTranslation('amount')}
                        offset={0}
                        position="insideLeft"
                        angle={-90}
                    />
                </YAxis>
                <Tooltip />
                <Line dataKey="value" fill="#A2C367">
                    <LabelList dataKey="value" position="top" />
                </Line>
            </LineChart>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="80%">
            {chart}
        </ResponsiveContainer>
    );
};
export default Chart;
