package com.company.finalCapstone.service;

import com.company.finalCapstone.dao.InventoryRepository;
import com.company.finalCapstone.dto.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepo;

    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    public Inventory getInventoryById(int id){
        return inventoryRepo.getOne(id);
    }

    public Inventory addItem(Inventory newItem) {
        return inventoryRepo.save(newItem);
    }

    public Inventory updateInventoryItem(Inventory changedItem, int id){
        if(changedItem.getId() == id){
            return inventoryRepo.save(changedItem);
        }
        return null;
    }

    public float getTotalTax(int id){
        Inventory item = inventoryRepo.getOne(id);
        int itemId = item.getId();

        float totalTax;

        float categoryTax = this.getCategoryTax(itemId);
        float importTax = this.getImportTax(itemId);

        return totalTax = categoryTax + importTax;

    }

    private float getCategoryTax(int id){
        Inventory item = inventoryRepo.getOne(id);
        String type = item.getCategory();
        float categoryTax = 0;

        switch(type.toLowerCase()) {
            case "music":
                categoryTax = 0.1f;
                break;
            case "luxury":
                categoryTax = 0.1f;
                break;
            case "clothing":
                categoryTax = 0.1f;
        }
        return categoryTax;
    }

    private float getImportTax(int id){
        Inventory item = inventoryRepo.getOne(id);
        boolean domestic = item.getDomestic();
        float importTax = 0;
        if(domestic == false){
            importTax = 0.05f;
        }
        return importTax;
    }

    public void deleteInventoryItemById(int id){
        inventoryRepo.deleteById(id);
    }

    public void purchase(Inventory[] items) {
        for(Inventory i : items) {
            Inventory currInventory = this.getInventoryById(i.getId());

            currInventory.setQuantity(currInventory.getQuantity() - i.getQuantity());
            this.updateInventoryItem(currInventory, currInventory.getId());
        }
    }
}
