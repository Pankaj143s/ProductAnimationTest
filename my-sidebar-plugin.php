<?php
/**
 * Plugin Name: My Sidebar Plugin
 * Description: A plugin that adds a smooth sidebar with images.
 * Version: 1.0
 * Author: Your Name
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Enqueue our CSS & JS
function my_sidebar_enqueue_scripts() {
    wp_enqueue_style('my-sidebar-style', plugin_dir_url(__FILE__) . 'style.css', array(), '1.0');
    wp_enqueue_script('my-sidebar-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'my_sidebar_enqueue_scripts');

// Output the sidebar HTML somewhere (for example, in the footer or use a shortcode)
function my_sidebar_output() {
    ?>
    <div class="sidebar-container" id="sidebar">
        <button class="sidebar-toggle" id="sidebarToggle">
            <img src="<?php echo plugin_dir_url(__FILE__) . 'product-image.jpg'; ?>" alt="Product" class="toggle-btn-image"/>
        </button>
        <div class="sidebar-content">
            <h2>Sidebar Title</h2>
            <div class="sidebar-images">
                <img src="<?php echo plugin_dir_url(__FILE__) . 'image1.jpg'; ?>" alt="Sidebar Image 1">
                <img src="<?php echo plugin_dir_url(__FILE__) . 'image2.jpg'; ?>" alt="Sidebar Image 2">
                <img src="<?php echo plugin_dir_url(__FILE__) . 'image3.jpg'; ?>" alt="Sidebar Image 3">
            </div>
            <p>Your text goes here.</p>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'my_sidebar_output');
