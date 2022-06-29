import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    selectResultsStatus
    } from './resultsSlice';

import ResultsLoading from './components/ResultsLoading';
import ResultsSuccess from './components/ResultsSuccess';
import ResultsError from './components/ResultsError';

import './Results.css'

const Results = () => {
    const navigate = useNavigate();
    const resultsStatus = useSelector(selectResultsStatus);
    
    useEffect(() => {
        if (resultsStatus === 'idle') {
            navigate('/', { replace: true });
        };
    });

    switch (resultsStatus) {
        case 'loading':
            return <ResultsLoading />
        case 'succeeded':
            return <ResultsSuccess />
        case 'error':
            return <ResultsError />
        default:
            return <ResultsError />
    };
};

export default Results;