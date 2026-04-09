package org.cloud.controll;

import java.util.List;

import org.cloud.dto.ProductDTO;
import org.cloud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;
//github test pull
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/product")
public class ProductApiController {

	@Autowired	
	private ProductService productService;
	
	@GetMapping("/list")
	public List<ProductDTO> openProductList() throws Exception {
		return productService.productList();
	}
	
	@PostMapping("/insert")
	public String insertProduct(@ModelAttribute ProductDTO product) throws Exception {
		productService.insertProduct(product);
		return "insert success";
	}
	
	@GetMapping("/detail/{num}")
	public ProductDTO openProductDetail(@PathVariable("num") int num) throws Exception {
		return productService.productDetail(num);
	}
	
	@PostMapping("/update")
	public String updateProduct(@ModelAttribute ProductDTO product) throws Exception {
		productService.updateProduct(product);
		return "update success";
	}
	
	@DeleteMapping("/delete/{num}")
	public String deleteProduct(@PathVariable("num") int num) throws Exception {
		productService.deleteProduct(num);
		return "delete success";
	}
}
