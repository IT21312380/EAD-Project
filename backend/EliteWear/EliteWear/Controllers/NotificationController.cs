﻿using EliteWear.Dtos;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

namespace EliteWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificationService;

        public NotificationController(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("csr/{customerId}")]
        public async Task<IActionResult> GetVendorNotifications(int customerId)
        {
            var notifications = await _notificationService.GetNotificationsFromCSRAsync(customerId);
            return Ok(notifications);
        }

        [HttpGet("customer")]
        public async Task<IActionResult> GetCustomerNotifications()
        {
            var notifications = await _notificationService.NotificationsFromCustomerAsync();
            return Ok(notifications);
        }

        [HttpPost("csr")]
        public async Task<IActionResult> CreateCSRNotification(int customerId, [FromBody] NotificationDto notificationDto)
        {
            await _notificationService.CreateCSRNotificationAsync(customerId, notificationDto.Id, notificationDto.Message);
            return Ok();
        }

        [HttpPost("customer/{customerId}")]
        public async Task<IActionResult> CreateCustomerNotification(int customerId, [FromBody] NotificationDto notificationDto)
        {
            await _notificationService.CreateCustomerNotificationAsync(notificationDto.Id, customerId, notificationDto.Message);
            return Ok();
        }

    }
}
