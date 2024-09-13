import * as newsApiOrg from './newsApiOrg.service';
import * as theNewsApi from './theNews.service';
import * as theGuardian from './theGuardian.service'
import * as nyTimesApi from "./nyTimes.services";
import { DataSources } from '@/lib/types';

export const newsFetcherFunctions: Record<DataSources, any> = {
	[DataSources.theGuardian]: theGuardian.fetchNews,
	[DataSources.newsApiOrg]: newsApiOrg.fetchNews,
	[DataSources.theNewsApi]: theNewsApi.fetchNews,
	[DataSources.nyTimesApi]: nyTimesApi.fetchNews,
};