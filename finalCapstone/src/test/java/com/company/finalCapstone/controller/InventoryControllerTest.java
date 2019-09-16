package com.company.finalCapstone.controller;

import com.company.finalCapstone.controller.InventoryController;
import com.company.finalCapstone.dto.Inventory;
import com.company.finalCapstone.service.InventoryService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Before;
import org.junit.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class InventoryControllerTest {
    private MockMvc mockMvc;

    //mocking service layer
    @Mock
    InventoryService mockInventoryService;

    // creating an instance of the controller class and injecting the InventoryService @Mock
    @InjectMocks
    InventoryController inventoryController;

    Inventory item1;
    Inventory item2;

    List<Inventory> inventoryList;

    // creating mock inventory items prior to running tests
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(inventoryController).build();

        item1 = new Inventory();
        item1.setId(1);
        item1.setName("Emma by Jane Austen");
        item1.setDescription("book by Jane Austen");
        item1.setCategory("Books");
        item1.setImageUrl("assets/image.jpg");
        item1.setDomestic(true);
        item1.setPrice(5.99f);
        item1.setQuantity(30);

        item2 = new Inventory();
        item2.setId(2);
        item2.setName("Frozen Strawberries");
        item2.setDescription("The most delicious space fruit.");
        item2.setCategory("Food");
        item2.setImageUrl("assets/image2.jpg");
        item2.setDomestic(false);
        item2.setPrice(7.99f);
        item2.setQuantity(50);

        inventoryList = Arrays.asList(item1, item2);
    }

        // testing incorrect path
        @Test
        public void rootContext_ShouldRespondWith404() throws Exception {
            mockMvc.perform(get("/"))
                    .andExpect(status().isNotFound());
        }

        // testing method GET getAllInventory
        @Test
        public void ShouldReturnAllInventory() throws Exception {
            when(mockInventoryService.getAllInventory()).thenReturn(inventoryList);

            mockMvc.perform(get("/inventory"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].name", is(inventoryList.get(0).getName())));

            verify(mockInventoryService).getAllInventory();
        }

        // testing method DELETE deleteInventoryItemById
        @Test
        public void ShouldDeleteInventory() throws Exception {
            mockMvc.perform(delete("/inventory/1"))
                    .andExpect(status().isOk()).andReturn();

            verify(mockInventoryService).deleteInventoryItemById(1);
        }

        // testing method POST addItem
        @Test
        public void ShouldAddInventoryItem() throws Exception {
            Inventory newItem = new Inventory();
            newItem.setId(3);
            newItem.setName("Holo Doctor");
            newItem.setDescription("Holographic Medical Examiner");
            newItem.setCategory("Medical");
            newItem.setImageUrl("assets/image3.jpg");
            newItem.setDomestic(true);
            newItem.setPrice(2.00f);
            newItem.setQuantity(10);

            when(mockInventoryService.addItem(newItem)).thenReturn(newItem);

            ObjectMapper mapper = new ObjectMapper();
            String objStr = mapper.writeValueAsString(newItem);

            mockMvc.perform(post("/inventory")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objStr))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.name", is(newItem.getName()))).andReturn();

            verify(mockInventoryService).addItem(newItem);

        }

        // testing updateInventoryItem method
        @Test
        public void ShouldUpdateInventoryItem() throws Exception {
            Inventory newItem = new Inventory();
            newItem.setId(3);
            newItem.setName("Holo Doctor");
            newItem.setDescription("Holographic Medical Examiner");
            newItem.setCategory("Medical");
            newItem.setImageUrl("assets/image3.jpg");
            newItem.setDomestic(true);
            newItem.setPrice(2.00f);
            newItem.setQuantity(10);

            ObjectMapper mapper = new ObjectMapper();
            String objStr = mapper.writeValueAsString(newItem);

            mockMvc.perform(put("/inventory/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objStr))
                    .andDo(print())
                    .andExpect(status().isOk()).andReturn();

            verify(mockInventoryService).updateInventoryItem(newItem, 1);
        }
    }

