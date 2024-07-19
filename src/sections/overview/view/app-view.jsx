import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'date-fns';
const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------

export default function AppView() {
  const [transactions, setTransactions] = useState([]);
  const [services, setServices] = useState([]);
  const [countDay, setCountDay] = useState(null);
  const [countMonth, setCountMonth] = useState(null);
  const [countYear, setCountYear] = useState(null);



  const apiTransaction = `${apiRoot}/transaction/statistic`
  const apiServiceUsed = `${apiRoot}/service/count-service-used`
  const apiDay = `${apiRoot}/appointment/statistic-appointment`
  const params1 = { date: new Date(), type : 1  };
  const apiMonth = `${apiRoot}/appointment/statistic-appointment`
  const params2 = { date:  new Date(), type : 2 };
  const apiYear = `${apiRoot}/appointment/statistic-appointment`
  const params3 = { date: new Date(), type : 3 };
  const monthlyValues = new Array(12).fill(0);


  useEffect(() => {
    Promise.all([
      axios.get(apiTransaction),
      axios.get(apiServiceUsed),
      axios.get(apiDay, { params: params1 }),
      axios.get(apiMonth, { params: params2 }),
      axios.get(apiYear, { params: params3 }),

    ]).then(responses => {
      const [transactionResponse, serviceResponse, apiDayResponse, apiMonthResponse, apiYearResponse] = responses;
      const serviceData = serviceResponse.data.data;
      setServices(serviceData)
      setCountDay(apiDayResponse.data.data.statistic)
      setCountMonth(apiMonthResponse.data.data.statistic)
      setCountYear(apiYearResponse.data.data.statistic)
      transactionResponse.data.data.forEach(obj => {
        const [month, value] = Object.entries(obj)[0];
        const monthIndex = parseInt(month, 10) - 1; 
        monthlyValues[monthIndex] += value;
      });
      setTransactions(monthlyValues);

    }).catch(error => {
      console.log(error);
    })
  }, []);


  useEffect(() => {
    console.log('Services updated:', transactions);
  }, [transactions]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Daily Booking"
            total={countDay} 
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>


        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Weekly Booking"
            total={countMonth}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Yearly Booking"
            total={countYear}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Revenue"
            chart={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ],
              series: [
                {
                  name: 'Amount',
                  type: 'column',
                  fill: 'solid',
                  data: transactions,
                }
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Service Used"
            chart={{
              series: services
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}





      </Grid>
    </Container>
  );
}
