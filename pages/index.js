import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import SaleHouse from '../assets/images/sale-house.jpg'
import RentHouse from '../assets/images/rent-house.jpg'

import Property from '../components/Property'

import { baseURL, fetchApi } from '../utils/fetchApi'

const Banner = ({
  purpose,
  imageURL,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
}) => {
  return (
    <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
      <Image src={imageURL} width={500} height={300} alt='banner' />
      <Box p='5'>
        <Text color='gray.500' fontSize='sm' fontWeight='medium'>
          {purpose}
        </Text>
        <Text fontSize='3xl' fontWeight='bold'>
          {title1} <br /> {title2}
        </Text>
        <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize='xl'>
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  )
}

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose='Rent a home'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore apartments, villas, homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageURL={RentHouse}
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose='Buy a home'
        title1='Find, buy and own your'
        title2='Dream Home'
        desc1='Explore apartments, villas, homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-rent'
        imageURL={SaleHouse}
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertiesForSale = await fetchApi(
    `${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  )
  const propertiesForRent = await fetchApi(
    `${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  )
  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits,
    },
  }
}
