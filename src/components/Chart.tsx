import { getTranslation, getTranslationStatic } from '@services/languageHelper';
import { setHoverFeatures } from '@store/reducer';
import {
    selectAttribute,
    selectCategory,
    selectFeatures,
    selectLanguage,
} from '@store/selectors';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
    Label,
    LabelList,
    ScatterChart,
    Scatter,
    Cell,
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
    const language = useSelector(selectLanguage);

    const [data, setData] = useState<any>(null);
    const [translations, setTranslations] = useState<any>(null);

    const orderArray: any = [
        'natural (1.0 - 1.4)',
        'obstructed (1.5 - 1.9)',
        'strongly obstructed (2.0 - 2.4)',
        'artificial (2.5 - 3.0)',
        'unpolluted - I',
        'slightly polluted - I-II',
        'moderately polluted - II',
        'seriously polluted - II-III',
        'heavily polluted - III',
        'very heavily polluted - III-IV',
        'excessively polluted - IV',
    ];

    const colors: any = {
        'natural (1.0 - 1.4)': '#0088cc',
        'obstructed (1.5 - 1.9)': '#66cc00',
        'strongly obstructed (2.0 - 2.4)': '#cccc00',
        'artificial (2.5 - 3.0)': '#cc0000',
        'unpolluted - I': '#80bfff',
        'slightly polluted - I-II': '#00ffcc',
        'moderately polluted - II': '#66cc00',
        'seriously polluted - II-III': '#cccc00',
        'heavily polluted - III': '#ffaa00',
        'very heavily polluted - III-IV': '#cc0000',
        'excessively polluted - IV': '#b84c00',
    };

    const categoryToCharType: any = {
        bioQuality: 'bar',
        waterQuality: 'bar',
        waterToBio: 'line',
        waterToOxygen: 'line',
        waterToNitrate: 'line',
        bioToOxygen: 'line',
        bioToNitrate: 'line',
        oxygenToTemp: 'point',
    };

    useEffect(() => {
        parseData(features);
    }, [features, language]);

    const tickFormatter = (value: string, index: number) => {
        value = getTranslationStatic(translations[value] + '_label');
        const limit = 10; // put your maximum character
        if (value.length < limit) return value;
        return `${value.substring(0, limit)}...`;
    };

    const parseData = (features: any) => {
        const dataTemp = [];
        const translationsTemp: any = {};

        for (const i in features) {
            if (['oxygenToTemp'].includes(category)) {
                const tempValues = Object.values(features[i].attributes);
                dataTemp.push({
                    x: tempValues[0],
                    y: tempValues[1],
                });
            } else if (
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
                orderArray.indexOf(translationsTemp[a.name]) -
                orderArray.indexOf(translationsTemp[b.name])
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
                    onMouseOver={(event) => {
                        dispatch(setHoverFeatures(translations[event.name]));
                    }}
                    onMouseOut={(event) => {
                        dispatch(setHoverFeatures(null));
                    }}
                >
                    <LabelList dataKey="value" position="top" />
                    {data?.map((entry: any, index: any) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[translations[entry.name]]}
                            stroke={'#99999940'}
                            strokeWidth={1}
                        />
                    ))}
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
    } else if (categoryToCharType[category] == 'point') {
        chart = (
            <ScatterChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x"></XAxis>
                <YAxis>
                    <Label
                        value={getTranslation('amount')}
                        offset={0}
                        position="insideLeft"
                        angle={-90}
                    />
                </YAxis>
                <Tooltip />
                <Scatter dataKey="y" fill="#A2C367" />
            </ScatterChart>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="80%">
            {chart}
        </ResponsiveContainer>
    );
};
export default Chart;
