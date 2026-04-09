package org.cloud.controll;

import java.util.List;

import org.cloud.dto.ProductDTO;
import org.cloud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping("/list")
	public String openProductList(Model model) throws Exception {
		List<ProductDTO> list = productService.productList();
		model.addAttribute("list", list);

		return "productList";
	}

	@GetMapping("/productForm")
	public String openProductForm() throws Exception {
		return "productForm";
	}

	@PostMapping("/productInsert")
	public String insertProduct(ProductDTO product) throws Exception {
		productService.insertProduct(product);
		return "redirect:/product/list";
	}

	@GetMapping("/write")
	public String openWriteProductForm(ProductDTO product) throws Exception {

		return "writeProduct";
	}

	@GetMapping("/productDetail")
	public String productDetail(@RequestParam("num") int num, Model model) throws Exception {
		ProductDTO product = productService.productDetail(num);
		model.addAttribute("product", product);

		return "productDetail";
	}

	@GetMapping("/modify")
	public String openProductModify(@RequestParam("num") int num, Model model) throws Exception {
		ProductDTO product = productService.productDetail(num);
		model.addAttribute("product", product);

		return "productModify";
	}

	@PostMapping("/modify")
	public String modifyProduct(ProductDTO product) throws Exception {
		productService.updateProduct(product);
		return "redirect:/product/list";
	}

	@GetMapping("/delete")
	public String deleteProduct(@RequestParam("num") int num) throws Exception {
		productService.deleteProduct(num);
		return "redirect:/product/list";
	}
}
