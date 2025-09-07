package com.practice.service;

import com.practice.model.Product;
import com.practice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;

    @Override
    public Product createProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existing = repository.findById(id);
        if (existing.isPresent()) {
            Product product = existing.get();
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            return repository.save(product);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
