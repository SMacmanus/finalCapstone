package com.company.finalCapstone.service;

import com.company.finalCapstone.dao.InventoryRepository;
import com.company.finalCapstone.dto.Inventory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class InventoryServiceTest {
    @Mock
    @Autowired
    InventoryRepository inventoryRepoMock;

    @InjectMocks
    InventoryService inventoryService;

    Inventory item1;
    Inventory item2;

    List<Inventory> inventoryList;

    @Before
    public void setUp() {
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

    @Test
    public void shouldGetItemTax(){
        when(inventoryRepoMock.getOne(2)).thenReturn(item2);
        assertEquals(0.05f, inventoryService.getTotalTax(2), 0);
    }
    @Test
    public void shouldGetAllInventory() {
        when(inventoryRepoMock.findAll()).thenReturn(inventoryList);
        assertEquals(inventoryList, inventoryService.getAllInventory());
    }

    @Test
    public void shouldGetInventoryById() {
        when(inventoryRepoMock.getOne(1)).thenReturn(item1);
        assertEquals(item1, inventoryService.getInventoryById(1));
    }

    @Test
    public void shouldAddItem() {
        when(inventoryRepoMock.save(item1)).thenReturn(item1);
        assertEquals(item1, inventoryService.addItem(item1));

        when(inventoryRepoMock.save(item2)).thenReturn(item2);
        assertEquals(item2, inventoryService.addItem(item2));
    }

    @Test
    public void shouldUpdateInventoryItem() {
        when(inventoryRepoMock.save(item1)).thenReturn(item1);
        assertEquals(item1, inventoryService.updateInventoryItem(item1, 1));
    }
}
