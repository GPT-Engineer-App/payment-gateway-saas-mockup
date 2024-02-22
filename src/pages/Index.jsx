import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import { FaCreditCard } from "react-icons/fa";

const Index = () => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  // Mock API call to payment provider
  const processPayment = (paymentDetails) => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API response
        resolve({ success: true, message: "Payment processed successfully!" });
      }, 2000);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const paymentDetails = { amount, cardNumber };
      const response = await processPayment(paymentDetails);

      if (response.success) {
        toast({
          title: "Payment Successful",
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Payment Failed",
          description: response.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box p={10}>
      <VStack spacing={4} as="form" onSubmit={handlePayment}>
        <FormControl id="amount" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input placeholder="Enter amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormControl>
        <FormControl id="card-number" isRequired>
          <FormLabel>Credit Card Number</FormLabel>
          <Input placeholder="Enter card number" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaCreditCard />} colorScheme="blue" type="submit" isLoading={isProcessing} loadingText="Processing">
          Pay Now
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
